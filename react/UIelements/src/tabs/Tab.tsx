type tabProps = {
    name : string,
    onClick?: () => void;
}
export default function Tab (props : tabProps){
    return (
        <section className="tab-container">
            <button onClick={props.onClick}>
                {props.name}
            </button>
        </section>
    )
}