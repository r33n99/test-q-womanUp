import React from "react";

export const ListItem = ({
  id,
  status,
  title,
  description,
  date,
  file,
  handleEditModal,
  fetchDeleteTodo,
  fetchEditTodo,
  setTodos,
}) => {
  const [diffDate, setDiffDate] = React.useState(false);

  const handleChangeStatus = (e) => {
    setTodos((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          return { ...el, status: e.target.checked };
        } else {
          return el;
        }
      })
    );
    fetchEditTodo(id, { status: e.target.checked });
  };

  React.useEffect(() => {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const todayDate = `${year}-${month + 1}-${day}`;
    setDiffDate(new Date(date) < new Date(todayDate));
  }, [date]);

  return (
    <tr className={diffDate || status ? "table-row" : ""}>
      <td>
        <input checked={status} onChange={handleChangeStatus} type="checkbox" />
      </td>
      <td>{title ? title : "заголовок отсутствует"}</td>
      <td>{description ? description : "описание отсутствует"}</td>
      <td>
        <input disabled value={date} type="date" />
      </td>
      <td>{file.name || <p>нету</p>}</td>
      <td>
        <button
          className="talbe__btn-delete"
          onClick={() => fetchDeleteTodo(id)}
        >
          удалить
        </button>
      </td>
      <td>
        <button className="table__btn-edit" onClick={() => handleEditModal(id)}>
          редактировать
        </button>
      </td>
    </tr>
  );
};
