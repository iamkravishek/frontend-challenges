type props = {
    name:string
}

function Header(props : props){
    return (
        <section className="header-container max-w-screen bg-gray-300 flex flex-row items-center justify-center">
            <h1 className="font-bold text-xl">
                {props?.name}
            </h1>
        </section>
    )
}

export default Header;