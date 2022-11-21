import axios from "axios";
import React from "react";
import useFetch from "../hooks/useFetch";
import { Modal } from "./Modal";
import { ListItem } from "./ListItem";

export const List = () => {
  const { data, error, loading } = useFetch(
    "https://637744b581a568fc251093f7.mockapi.io/todos"
  );
  const [todos, setTodos] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [editedTodo, setEditedTodo] = React.useState();
  const [typeModal,setTypeModal] = React.useState("")
  const handleEditTodo = (obj) => {
    setTodos(
      todos.map((el) => {
        if (el.id === obj.id) {
          return { ...el, ...obj };
        } else {
          return el;
        }
      })
    );
    fetchEditTodo(obj.id, obj);
  };

  console.log(typeModal)

  const fetchCreateTodo = async (obj) => {
    try {
      setTodos([...todos, obj]);
      const response = await axios.post(
        "https://637744b581a568fc251093f7.mockapi.io/todos",
        obj
      );
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(error);

  const fetchEditTodo = async (id, todo) => {
    try {
      const response = await axios.put(
        `https://637744b581a568fc251093f7.mockapi.io/todos/${id}`,
        todo
      );
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDeleteTodo = async (id) => {
    try {
      const newTodos = todos.filter((el) => el.id !== id);
      setTodos(newTodos);
      const response = await axios.delete(
        `https://637744b581a568fc251093f7.mockapi.io/todos/${id}`
      );
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditModal = (id) => {
    const todo = todos.find((el) => el.id === id);
    setEditedTodo(todo);
    setOpenModal((prev) => !prev);
  };

  const handleCreateModal = () => {
    setTypeModal("create")
    setOpenModal((prev) => !prev);

  }

  React.useEffect(() => {
    setTodos(data);
  }, [data]);

  const elements = [
    "Статус",
    "Заголовок",
    "Описание",
    "Дата завершения",
    "Файл",
    "Удалить",
    "Редактировать",
  ];

  return (
    <>
      {openModal && (
        <Modal
          editedTodo={editedTodo}
          setOpenModal={setOpenModal}
          handleEditTodo={handleEditTodo}
          typeModal={typeModal}
          fetchCreateTodo={fetchCreateTodo}
        />
      )}
      <div className="container">
        <div className="up-block">
          <h2>Just ToDo it :)</h2>
          <button onClick={handleCreateModal} className="create-todo">
            Создать новую задачу
          </button>
        </div>
        <div className="list">
          <table className="table">
            <thead>
              <tr>
                {elements.map((el) => (
                  <th>{el}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <div>Loading...</div>
              ) : (
                todos.map((todo) => (
                  <ListItem
                    key={todo.id}
                    {...todo}
                    setTypeModal={setTypeModal}
                    handleEditModal={handleEditModal}
                    fetchDeleteTodo={fetchDeleteTodo}
                    fetchEditTodo={fetchEditTodo}
                    setTodos={setTodos}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
