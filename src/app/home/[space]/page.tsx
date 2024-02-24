export default async function Page({ params }: { params: { space: number } }){
    const getSpaceData = async () => {
        let resp = await fetch(`http://localhost:3000/api/get-space?id=${params.space}`);
        let data = await resp.json();
        return data;
    }
    const spaceData = await getSpaceData();
    if(spaceData.status == 200){
        return (
            <div className="text-black h-full p-3 md:p-5">
                <h2 className="text-3xl font-bold"> {spaceData.body.name} </h2>
            </div>
            )
    }
    return <h2>Loading...</h2>
}