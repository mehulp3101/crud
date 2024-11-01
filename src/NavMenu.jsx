import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabase';


function NavMenu() {
    const [items, setItems] = useState([]); 
    

    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('scp').select('id, item');
            if (error) {
                console.error(error);
            } else {
                setItems(data);
            }
        };

        fetchItems();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {items.map((item) => (
                            <li className="nav-item" key={item.id}>
                                <Link className="nav-link" to={`/item/${item.id}`}>{item.item}</Link>
                            </li>
                        ))}
                        <li className="nav-item">
                            <Link className="nav-link"  to="/admin">Admin Panel</Link> 
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
    );
}

export default NavMenu;