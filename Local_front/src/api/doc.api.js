import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDocument } from '../actions/documentActions';

const DocumentForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch de l'action pour ajouter le document
    dispatch(addDocument({ title, content }));

    // Réinitialisation du formulaire
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenu"
      />
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default DocumentForm;
