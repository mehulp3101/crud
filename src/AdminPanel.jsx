import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import '../bootstrap5/css/bootstrap.css';
import '../bootstrap5/css/bootstrap.min.css';
import '../bootstrap5/js/bootstrap.min.js';
import './index.css';

function AdminPanel() {
    const [items, setItems] = useState([]);
    const [newRecord, setNewRecord] = useState({
        item: '',
        class: '',
        description: '',
        contentment: '',
        image: null
    });
    const [editRecord, setEditRecord] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('scp').select('*');
            if (error) {
                console.error(error);
            } else {
                setItems(data);
            }
        };
        fetchItems();
    }, []);

    const addItem = async (event) => {
        event.preventDefault(); // Prevent default form submission
        let imageUrl = null;
        
        if (newRecord.image) {
            // Check for unique file name
            const uniqueFileName = `${Date.now()}_${newRecord.image.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('images')
                .upload(uniqueFileName, newRecord.image);
            
            if (uploadError) {
                console.error(uploadError);
                return;
            }
    
            imageUrl = `https://tawjficqmiqctmtadlzg.supabase.co/storage/v1/object/public/images/${uploadData.path}`;
            newRecord.image = imageUrl; // Use the uploaded image URL
        }
    
        // Log the newRecord for debugging
        console.log('Adding new record:', newRecord);
    
        // Insert the new record directly
        const { error } = await supabase.from('scp').insert([newRecord]);
    
        if (error) {
            console.error('Insert error:', error);
        } else {
            setNewRecord({ item: '', class: '', description: '', contentment: '', image: null });
            setItems((prev) => [...prev, { ...newRecord, image: imageUrl }]); // Ensure image URL is used
        }
    };
    

    const deleteItem = async (id) => {
        const { error } = await supabase.from('scp').delete().eq('id', id);
        if (error) {
            console.error(error);
        } else {
            setItems((prev) => prev.filter(item => item.id !== id));
        }
    };

    const startEditing = (item) => {
        setEditRecord(item);
    };

    const saveEdit = async (id) => {
        const { error } = await supabase.from('scp').update(editRecord).eq('id', id);
        if (error) {
            console.error(error);
        } else {
            setEditRecord(null);
            setItems((prev) => prev.map(item => (item.id === id ? editRecord : item)));
        }
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {editRecord && editRecord.id === item.id ? (
                            <form className="form-inline" onSubmit={(e) => { e.preventDefault(); saveEdit(item.id); }}>
                                <div className="card">
                                    <div className="card-detail">
                                        <div className="form-group">
                                            <label>Item</label>
                                            <input value={editRecord.item} onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Class</label>
                                            <input value={editRecord.class} onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <input value={editRecord.description} onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Contentment</label>
                                            <input value={editRecord.contentment} onChange={(e) => setEditRecord({ ...editRecord, contentment: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Image</label>
                                            <input type="file" onChange={(e) => setEditRecord({ ...editRecord, image: e.target.files[0] })} />
                                        </div>
                                        <button type="button" onClick={() => saveEdit(item.id)} className='btn btn-success'>Save</button>
                                        <button type="button" onClick={() => setEditRecord(null)} className='btn btn-danger'>Cancel</button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id={`heading-${item.id}`}>
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${item.id}`} aria-expanded="true" aria-controls={`collapse-${item.id}`}>
                                            <p>{item.item}</p>
                                        </button>
                                    </h2>
                                    <div id={`collapse-${item.id}`} className="accordion-collapse collapse show" aria-labelledby={`heading-${item.id}`} data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <button onClick={() => startEditing(item)} className='btn btn-success'>Edit</button>
                                            <button onClick={() => deleteItem(item.id)} className='btn btn-danger'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <form onSubmit={addItem} className="form-inline">
                <div className="form-group">
                    <label>Item</label>
                    <input value={newRecord.item} placeholder='Item Name' onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Class</label>
                    <input value={newRecord.class} placeholder='Class Name' onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input value={newRecord.description} placeholder='Description' onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Contentment</label>
                    <input value={newRecord.contentment} placeholder='Contentment' onChange={(e) => setNewRecord({ ...newRecord, contentment: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type='file' onChange={(e) => setNewRecord({ ...newRecord, image: e.target.files[0] })} />
                </div>
                <button type="submit" className='btn btn-primary'>Add Item</button>
            </form>
        </div>
    );
}

export default AdminPanel;
