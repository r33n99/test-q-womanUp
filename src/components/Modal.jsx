import React from 'react';

export const Modal = ({ setOpenModal, editedTodo, handleEditTodo, typeModal, fetchCreateTodo }) => {
    if (typeModal === 'edit' && editedTodo) {
        var { title, description, date, id, file } = editedTodo;
    }
    const [titleTodo, setTitleTodo] = React.useState(typeModal === 'edit' ? title : '');
    const [descriptionTodo, setDescriptionTodo] = React.useState(typeModal === 'edit' ? description : '');
    const [dateTodo, setDateTodo] = React.useState(typeModal === 'edit' ? date : '');
    const [fileTodo, setFileTodo] = React.useState(typeModal === 'edit' ? file : {});

    const handleSaveTodo = () => {
        if (typeModal === 'edit') {
            handleEditTodo({
                id: id,
                title: titleTodo,
                description: descriptionTodo,
                date: dateTodo,
                file: fileTodo,
            });
        } else {
            fetchCreateTodo({
                title: titleTodo,
                description: descriptionTodo,
                date: dateTodo,
                file: fileTodo,
            });
        }
        setOpenModal(false);
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
                <h2>{typeModal === 'edit' ? `Изменить задачу #${id}` : 'Создать новую задачу'}</h2>
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
                <input value={dateTodo} onChange={(e) => setDateTodo(e.target.value)} type="date" />
                <span>Прикрепленный файл</span>
                <input onChange={changeFileTodo} type="file" />
                <div>
                    {typeModal === 'edit' ? (
                        <img className="modal-img" src={fileTodo?.image || file.image} alt={fileTodo.name} />
                    ) : (
                        <img className="modal-img" src={fileTodo?.image} alt={fileTodo.name} />
                    )}
                </div>
                <div className="modal__btn-group">
                    <button className="modal__btn-back btn-red" onClick={() => setOpenModal(false)}>
                        Назад
                    </button>
                    <button className="modal__btn-save btn-green" onClick={handleSaveTodo}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};
