'use client'

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
    label : string;
    // description : string;
    icon: IconType
    selected ? : boolean
}

function CategoryBox({label, icon : Icon, selected} : CategoryBoxProps){
    const router = useRouter();
    const params = useSearchParams();
    console.log(params);

    const handleClick = useCallback(()=>{
        let currentQuery = {};

        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updateQuery : any = {
            ...currentQuery, 
            category : label
        }
        // 현재 쿼리 스트링의 category 값과 누른 label이 같으면 쿼리 삭제
       if(params?.get('category') === label){
        delete updateQuery.category;
       }

       // 실제로 이동시킬 쿼리 생성
       const url = qs.stringifyUrl({
        url : '/',
        query : updateQuery
       }, {skipNull : true})

       router.push(url);
       
    },[label, params, router])


    return(
        <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-b-neutral-800' : 'border-transparent'} ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}>
            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    )
}

export default CategoryBox