import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { RotateCw, Search, ArrowLeft, FileText } from 'lucide-react';
import AdminTable from '@/components/common/AdminTable';
import { postService } from '@/api/postService';
import { PostListResponse, SearchPostRequest } from '@/types/post';

const PostManagement: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // URL 쿼리 파라미터에서 boardId 파싱
    const boardIdParam = searchParams.get('boardId');
    const boardId = boardIdParam ? parseInt(boardIdParam, 10) : undefined;

    // 이전 board/index.tsx 페이지에서 state로 넘겨준 boardName
    const boardNameFromState = location.state?.boardName;

    // 상태 관리
    const [posts, setPosts] = useState<PostListResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedSearch, setAppliedSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // 게시판 명칭 (게시글 목록에서 역으로 찾거나 state 사용)
    const [boardName, setBoardName] = useState<string>(boardNameFromState || '');

    // 데이터 페칭
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const params: SearchPostRequest = {
                page: currentPage,
                size: pageSize,
                search: appliedSearch || undefined,
                boardId: boardId
            };

            const data = await postService.findPostPage(params);
            setPosts(data.content);
            setTotalPages(data.totalPages);
            setTotalElements(data.totalElements);
            setCurrentPage(data.pageNumber);

            // 첫 번째 데이터가 있다면 게시판 이름 설정
            if (data.content.length > 0 && !boardName) {
                const firstPost = data.content[0];
                setBoardName(firstPost.boardName || firstPost.hBoard?.name || '');
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    // Effect: 페이지, 사이즈, 검색어 변경 시 호출
    useEffect(() => {
        fetchPosts();
    }, [currentPage, pageSize, appliedSearch, boardId]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setAppliedSearch(searchQuery);
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        fetchPosts();
    };

    // 테이블 컬럼 정의
    const columns = [
        {
            header: 'ID',
            key: 'id',
            render: (post: PostListResponse) => (
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">#{post.id}</span>
            )
        },
        {
            header: '게시판',
            key: 'boardName',
            render: (post: PostListResponse) => (
                <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400">
                    {post.boardName || post.hBoard?.name || '-'}
                </span>
            )
        },
        {
            header: '제목',
            key: 'title',
            render: (post: PostListResponse) => (
                <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                    {post.title}
                </span>
            )
        },
        {
            header: '내용',
            key: 'content',
            render: (post: PostListResponse) => (
                <span className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 max-w-md">
                    {post.content}
                </span>
            )
        },
        {
            header: '조회수',
            key: 'viewCount',
            align: 'right' as const,
            render: (post: PostListResponse) => (
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {post.viewCount.toLocaleString()} 회
                </span>
            )
        }
    ];

    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <button
                            onClick={() => navigate('/admin/board')}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        >
                            <ArrowLeft size={14} />
                            게시판 목록으로
                        </button>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        게시글 관리
                        {boardName && (
                            <span className="text-xl font-bold text-violet-600 dark:text-violet-400">
                                ({boardName})
                            </span>
                        )}
                        <span className="text-sm font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                            전체 {totalElements}개
                        </span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-1 font-medium">선택한 게시판에 등록된 게시글들을 조회합니다.</p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                        onClick={handleRefresh}
                        className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-violet-600 transition-all shadow-sm active:scale-95"
                        title="새로고침"
                    >
                        <RotateCw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="mb-6">
                <form onSubmit={handleSearch} className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="제목 또는 내용으로 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all outline-none text-sm font-bold shadow-sm"
                    />
                    {searchQuery !== appliedSearch && (
                        <span className="absolute ml-3 text-[10px] font-black text-amber-500 animate-pulse">
                            Enter를 눌러 검색
                        </span>
                    )}
                </form>
            </div>

            {/* Table Section */}
            {loading && posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                    <RotateCw className="animate-spin text-violet-500" size={32} />
                    <p className="font-semibold text-sm">게시글 정보를 불러오는 중입니다...</p>
                </div>
            ) : posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-slate-400 gap-4">
                    <FileText size={48} className="text-slate-300 dark:text-slate-700" />
                    <div className="text-center">
                        <p className="font-black text-slate-700 dark:text-slate-300">등록된 게시글이 없습니다.</p>
                        <p className="text-xs text-slate-400 mt-1 font-medium">해당 게시판에 작성된 첫 게시글을 기다리고 있습니다.</p>
                    </div>
                </div>
            ) : (
                <div className={loading ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
                    <AdminTable
                        columns={columns}
                        data={posts}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={(size) => {
                            setPageSize(size);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default PostManagement;
