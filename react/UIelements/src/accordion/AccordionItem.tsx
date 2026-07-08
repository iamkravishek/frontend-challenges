import './AccordionItem.css'

type contentProps = {
    q: string
    a: string
    isOpen: boolean
    toggle: ()=> void
};
export default function AccordionItem(props: contentProps) {
    return (


         <section className="accordion-item" onClick={props.toggle}>
                    <div className="headline">
                        <h3>{props.q}</h3>
                        <p>+</p>
                    </div>
                    <div className={props.isOpen ? ' content open' : "content"}>
                        {props.a}
                    </div>
         </section>
    )
}