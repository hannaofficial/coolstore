import { Skeleton } from "../ui/skeleton";


export function LoadingTable({rows=5}:{rows?:number}){
    const tableRows = Array.from({length:rows},(_,index)=>{
        return(
            <div className="mb-4" key={index}>
                <Skeleton className="w-full h-8 rounded"/>

            </div>
        )
    })
    return (
        <>{tableRows}</>
    )
}


export function LoadingTableUpdate({rows=5}:{rows?:number}){
    const tableRows = Array.from({length:rows},(_,index)=>{
        return(
            <div className="mb-4 flex gap-4" key={index}>
                <Skeleton className="w-1/2 h-8 rounded"/>
                <Skeleton className="w-1/2 h-8 rounded"/>

            </div>
        )
    })
    return (
        <>
        <div className="mb-4">
            <Skeleton className="w-1/4 h-48"/>
        </div>
        {tableRows}
        <div className="mb-4">
            <Skeleton className="w-full h-24"/>
        </div>
        <Skeleton className="w-1/6 h-12"/>
        </>
    )
}
