export interface SubMenu {
    name: string;
    path: string;
}

export interface NavigationMenu {
    title: string;
    subMenus: SubMenu[];
}

export const BASE_MENUS: NavigationMenu[] = [
    {
        title: '공방 탐색',
        subMenus: [
            { name: '카테고리별 클래스', path: '/workshops' },
            { name: '실시간 핫플레이스', path: '#' },
            { name: '신규 공방', path: '#' },
            { name: '지도로 공방기', path: '#' }
        ]
    },
    {
        title: '커뮤니티',
        subMenus: [
            { name: '찐 후기 자랑', path: '/community/reviews' },
            { name: '공방 소식', path: '/community/news' },
            { name: '작가님 인터뷰', path: '/community/interviews' }
        ]
    },
    {
        title: '제휴 문의',
        subMenus: [
            { name: '공방 입점 안내', path: '#' },
            { name: '작가 신청', path: '#' },
            { name: '광고/제휴', path: '#' }
        ]
    },
];

export const ADMIN_MENU: NavigationMenu = {
    title: '시스템 관리',
    subMenus: [
        { name: '사용자 관리', path: '/admin/user' },
        { name: '공방 관리', path: '/admin/workplace' },
        { name: '게시판 관리', path: '/admin/board' },
        { name: '접속 이력 관리', path: '/admin/access' },
        { name: '결제 정보 관리', path: '/admin/payment' }
    ]
};

export const getNavigationMenus = (role?: string): NavigationMenu[] => {
    const menus = [...BASE_MENUS];
    
    if (role === 'ROLE_ADMIN') {
        menus.push(ADMIN_MENU);
    }
    
    return menus;
};
