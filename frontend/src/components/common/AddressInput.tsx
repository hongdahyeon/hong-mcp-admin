import React from 'react';
import { Address } from '@/types/address';
import { MapPin } from 'lucide-react';

interface AddressInputProps {
    value?: Partial<Address>;
    onChange: (address: Address) => void;
    label?: string;
    required?: boolean;
}

const AddressInput: React.FC<AddressInputProps> = ({ 
    value = {}, 
    onChange, 
    label = "주소", 
    required = false 
}) => {
    
    const handleChange = (field: keyof Address, val: string) => {
        onChange({
            city: value.city || '',
            district: value.district || '',
            neighborhood: value.neighborhood || '',
            detail: value.detail || '',
            zipcode: value.zipcode || '',
            [field]: val
        });
    };

    return (
        <div className="space-y-3">
            {label && (
                <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1 flex items-center gap-2">
                    <MapPin size={16} className="text-violet-500" />
                    {label} {required && <span className="text-rose-500">*</span>}
                </label>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                    type="text"
                    placeholder="시/도 (예: 서울특별시)"
                    value={value.city || ''}
                    onChange={(e) => handleChange('city', e.target.value)}
                    required={required}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-sm"
                />
                <input
                    type="text"
                    placeholder="구/군 (예: 강남구)"
                    value={value.district || ''}
                    onChange={(e) => handleChange('district', e.target.value)}
                    required={required}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-sm"
                />
                <input
                    type="text"
                    placeholder="동/읍/면 (예: 역삼동)"
                    value={value.neighborhood || ''}
                    onChange={(e) => handleChange('neighborhood', e.target.value)}
                    required={required}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-sm"
                />
            </div>
            
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="우편번호"
                    value={value.zipcode || ''}
                    onChange={(e) => handleChange('zipcode', e.target.value)}
                    className="w-1/3 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-sm"
                />
                <input
                    type="text"
                    placeholder="상세 주소 (예: 101동 202호)"
                    value={value.detail || ''}
                    onChange={(e) => handleChange('detail', e.target.value)}
                    className="w-2/3 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium text-sm"
                />
            </div>
        </div>
    );
};

export default AddressInput;
