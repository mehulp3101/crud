import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from './supabase';
import '../bootstrap5/css/bootstrap.css';
import '../bootstrap5/css/bootstrap.min.css';
import '../bootstrap5/js/bootstrap.min.js';
import './index.css';

function ItemDetail() {
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            const { data, error } = await supabase.from('scp').select('*').eq('id', id).single();
            if (error) {
                console.error(error);
                setError("Failed to fetch item details.");
            } else {
                setItemData(data);
            }
        };
        fetchItemDetails();
    }, [id]);

    return (
        <div>
        {error && <p>{error}</p>}
            {itemData ? (
                <>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="${itemData.item}One">
                        <h3>{itemData.item}</h3>
                    </h2>
                    <div id="${itemData.item}One" className="accordion-collapse collapse show" aria-labelledby="${itemData.item}One" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <h3><b>Object className: </b>{itemData.class}</h3>
                            <p><img src={`${itemData.image}`} className="img w-50 h-50"  alt={itemData.item}/></p>
                            <h3>Description</h3>
                            <p>{itemData.description}</p>
                            <h3>Containment</h3>
                            <p>{itemData.contentment}</p>
                        </div>
                    </div>
                </div>
                </>
            ) : (
                <p>Loading....</p>
            )}
        </div>
        );
}

export default ItemDetail;
