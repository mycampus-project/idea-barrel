import React from "react"
import BulletinListItem from "../bulletinComponents/BulletinListItem"
// THIS IS NOT IN USE ATM
const PinnedItemsList = (props) => {

    const { pinnedItems, handleDelete, handleDialogOpen } = props


    const listItem = pinnedItems.map((d) =>
        <li onClick={() => handleDialogOpen(d)} key={d.id}><BulletinListItem data={d} handleDelete={handleDelete} /></li>)


    return (
        <div>
            <h1 style={{textAlign:"center"}}>Pinned Bulletins</h1>
            <ul>
                {listItem}
            </ul>
        </div>
    )
}
export default PinnedItemsList