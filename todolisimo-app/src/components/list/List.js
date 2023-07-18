import Card from '../card/Card';
import './List.scss';

export default function List({ cards }) {

    return (
        <ul className="container-tasks">
            {cards.map(item => {
                return (
                    <Card id={item.id} name={item.name} key={item.id} />
                )
            })}
        </ul>
    )
}