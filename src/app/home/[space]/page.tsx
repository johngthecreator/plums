export default function Page({ params }: { params: { space: string } }){
    return <div className="text-black">My Post: {params.space}</div>
}