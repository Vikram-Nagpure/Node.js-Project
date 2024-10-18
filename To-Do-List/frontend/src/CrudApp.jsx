import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudTable = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', Task: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems(); 
  }, []);

 
  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/items');
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault(); 
    if (!newItem.name || !newItem.Task) {
      alert('Please provide a name and Task.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/items', newItem);
      setItems([...items, res.data]);
      setNewItem({ name: '', Task: '' }); 
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };


  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setItems(items.filter((item) => item.id !== id)); 
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

 
  const updateItem = async (e) => {
    e.preventDefault();
    if (!editItem.name || !editItem.Task) {
      alert('Please provide a name and Task.');
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:5000/items/${editItem.id}`,
        editItem
      );
      setItems(
        items.map((item) => (item.id === editItem.id ? res.data : item))
      );
      setEditItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      <h1>CRUD Table</h1>
      <form onSubmit={addItem}>
        <h2>Add New Task</h2>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task"
          value={newItem.Task}
          onChange={(e) =>
            setNewItem({ ...newItem, Task: e.target.value })
          }
        />
        <button type="submit">Add Task</button>
       
      </form>

      {/* Edit */}
      {editItem && (
        <form onSubmit={updateItem}>
          <h2>Edit Item</h2>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) =>
              setEditItem({ ...editItem, name: e.target.value })
            }
          />
          <input
            type="text"
            value={editItem.Task}
            onChange={(e) =>
              setEditItem({ ...editItem, Task: e.target.value })
            }
          />
          <button type="submit">Update Item</button>
        </form>
      )}

      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td><h3>{item.name}</h3></td>
              <td><h3>{item.Task}</h3></td>
              <td>
                <button onClick={() => setEditItem(item)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
