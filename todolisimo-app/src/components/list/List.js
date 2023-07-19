import Card from '../card/Card';
import './List.scss';

export default function List({ cards, setCards }) {

    return (
        <ul className="container-tasks">
            {cards.map(item => {
                return (
                    <Card key={item.id} id={item.id} name={item.name} setCards={setCards} />
                )
            })}
        </ul>
    )
}