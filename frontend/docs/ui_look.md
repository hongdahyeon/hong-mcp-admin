# CraftDay UI Design Guidelines

This document outlines the UI patterns, components, and design rules established for the CraftDay platform. Use this as a reference when creating new features or pages to maintain consistency.

## 🎨 Core Design System

### Typography
- **Primary Font**: `Pretendard Variable` (Sans-serif)
- **Scale**:
    - `h1`: `text-2xl font-black` (Page Titles)
    - `h4`: `text-xs font-black uppercase tracking-widest` (Section Headers)
    - `Body`: `text-base` / `text-sm` font-medium
    - `Label`: `text-[10px] font-black` (Badges/Tags)

### Color Palette
- **Primary**: `Violet` (`#7c3aed`) - Accent, Buttons, Selection
- **Status**:
    - **Success**: `Emerald` - Active, Approved, Completed
    - **Warning**: `Amber` - Pending, Waiting
    - **Danger**: `Rose` - Blocked, Rejected, Refunded
- **Neutral**: `Slate` - Text, Borders, Backgrounds (Light: `white`, Dark: `slate-900`)

---

## 🧩 Modular Components

### AdminTable
A reusable table component for consistent data representation.

**Location**: `@/components/common/AdminTable.tsx`

**Usage Example**:
```tsx
import AdminTable from '@/components/common/AdminTable';

const columns = [
    { 
        header: 'Label', 
        key: 'dataKey', 
        render: (item) => <span className="font-bold">{item.dataKey}</span> 
    },
    { header: 'Action', key: 'action', align: 'right', render: () => <button>Edit</button> }
];

<AdminTable 
    columns={columns} 
    data={data} 
    currentPage={1}
    totalPages={5}
    onPageChange={(page) => console.log(page)}
    pageSize={10}
    onPageSizeChange={(size) => console.log(size)}
/>
```

**Features**:
- Automatically handles dark mode via Tailwind classes.
- Responsive overflow-x handling.
- **Pagination**: Supports integrated pagination controls (`< 1 2 3 >`).
- **Page Size Selection**: Users can choose to display 5, 10, 50, or 100 rows per page.
- Consistent hover effects and typography.

---

## 📐 Layout Rules

### Main Container
- **Max Width**: `max-w-[1440px]`
- **Padding**: `px-6` (Horizontal)
- **Top Offset**: `pt-16` (Due to fixed header)

### Mega Menu (Navigation)
- **Dynamic Columns**: Grid columns are calculated based on `menus.length`.
- **Transitions**: Uses `max-height` and `opacity` for smooth expand/collapse.

---

## 🚀 Prototyping Patterns

When creating new admin prototypes:
1. Wrap the page in a `div` with `p-6` padding.
2. Use a `flex justify-between items-center mb-6` header section.
3. Utilize `AdminTable` for data lists.
4. Use standard Tailwind status badges (`bg-xxx-100 text-xxx-600`) for consistency.

---

## 🔗 데이터 페이징 연동 (API 호출 패턴)

목록성 데이터를 서버에서 가져올 때는 항상 공통 타입을 사용하고 아래 패턴을 따릅니다.

### 1. 공통 타입 사용
```tsx
import { PageRequestDto, PageResponseDto } from '@/types/common';
```

### 2. 표준 데이터 패칭 패턴
```tsx
const [data, setData] = useState<ItemType[]>([]);
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const [totalPages, setTotalPages] = useState(1);

const fetchData = async () => {
    const params: PageRequestDto = {
        page: currentPage,
        size: pageSize,
        search: searchStr // 선택 사항
    };
    
    const response = await api.get<PageResponseDto<ItemType>>('/your-api-path', { params });
    const { content, totalPages, pageNumber } = response.data;
    
    setData(content);
    setTotalPages(totalPages);
    setCurrentPage(pageNumber); // 서버에서 보정된 현재 페이지 반영
};

useEffect(() => {
    fetchData();
}, [currentPage, pageSize]);
```
