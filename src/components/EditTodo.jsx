import React from "react";

export const EditTodo = ({ setEditMode, editedTodo, handleEditTodo }) => {
  const { title, description, date, id, file } = editedTodo;
  const [titleTodo, setTitleTodo] = React.useState(title);
  const [descriptionTodo, setDescriptionTodo] = React.useState(description);
  const [dateTodo, setDateTodo] = React.useState(date);
  const [fileTodo, setFileTodo] = React.useState(file);

  const handleSaveTodo = () => {
    handleEditTodo({
      id: id,
      title: titleTodo,
      description: descriptionTodo,
      date: dateTodo,
      file: fileTodo,
    });
    setEditMode(false);
  };

  const changeFileTodo = (e) => {
    if (e.target.files[0]) {
      const value = e.target.files[0];
      const image = URL.createObjectURL(value);
      setFileTodo({ url: e.target.value, image: image, name: value.name });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Изменить задачу</h2>
        <span>заголовок</span>
        <input
          value={titleTodo}
          onChange={(e) => setTitleTodo(e.target.value)}
          type="text"
          placeholder="Заголовок"
        />
        <span>описание</span>
        <input
          value={descriptionTodo}
          onChange={(e) => setDescriptionTodo(e.target.value)}
          placeholder="Описание"
          type="text"
        />
        <span>Дата завершения</span>
        <input
          value={dateTodo}
          onChange={(e) => setDateTodo(e.target.value)}
          type="date"
        />
        <span>Прикрепленный файл</span>
        <input onChange={changeFileTodo} type="file" />
        <div>
          <img
            className="modal-img"
            src={fileTodo?.image || file.image}
            alt={fileTodo.name}
          />
        </div>
        <div>
          <button className="modal__btn-back" onClick={() => setEditMode(false)}>Назад</button>
          <button className="modal__btn-save" onClick={handleSaveTodo}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};
