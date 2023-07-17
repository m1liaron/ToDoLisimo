import Item from "./item/Item";

export default function List({ tasks }) {
    return (
        <ul>
            {tasks.map(item => <Item key={item.id} {...item} />)}
        </ul>
    )
}