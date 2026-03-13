import React from 'react';

interface Column<T> {
    header: string;
    key: string;
    className?: string;
    render?: (item: T) => React.ReactNode;
    align?: 'left' | 'right' | 'center';
}

interface AdminTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (item: T) => void;
    // Pagination props
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    // Page size props
    pageSize?: number;
    onPageSizeChange?: (size: number) => void;
}

const AdminTable = <T extends { id: string | number }>({
    columns,
    data,
    onRowClick,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    pageSize = 10,
    onPageSizeChange
}: AdminTableProps<T>) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest ${column.align === 'right' ? 'text-right' :
                                        column.align === 'center' ? 'text-center' : 'text-left'
                                        } ${column.className || ''}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {data.map((item) => (
                            <tr
                                key={item.id}
                                onClick={() => onRowClick?.(item)}
                                className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'}`}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={`${item.id}-${column.key}`}
                                        className={`px-6 py-4 ${column.align === 'right' ? 'text-right' :
                                            column.align === 'center' ? 'text-center' : 'text-left'
                                            }`}
                                    >
                                        {column.render ? column.render(item) : (
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                                {(item as any)[column.key]}
                                            </span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 font-medium">
                                    데이터가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Table Footer: Pagination & Page Size */}
            {(onPageChange || onPageSizeChange) && (
                <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Rows Per Page Selector */}
                    {onPageSizeChange ? (
                        <div className="flex items-center gap-3">
                            <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 shadow-sm">
                                {[5, 10, 50, 100].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => onPageSizeChange(size)}
                                        className={`px-3 py-1.5 rounded-md text-[10px] font-black transition-all ${pageSize === size
                                            ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400'
                                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : <div />}

                    {/* Pagination */}
                    {onPageChange && (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {[...Array(totalPages)].map((_, i) => {
                                const page = i + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => onPageChange(page)}
                                        className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${currentPage === page
                                            ? 'bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-none'
                                            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminTable;
