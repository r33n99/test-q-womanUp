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
  setTypeModal,
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

  const handleChangeType = () => {
    handleEditModal(id);
    setTypeModal("edit");
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
        <input className="my-checkbox" checked={status} onChange={handleChangeStatus} type="checkbox" />
      </td>
      <td>{title ? title : "заголовок отсутствует"}</td>
      <td>{description ? description : "описание отсутствует"}</td>
      <td>
        <input disabled value={date} type="date" />
      </td>
      <td>{file.name || <p>нету</p>}</td>
      <td>
        <button
          className="talbe__btn btn-red"
          onClick={() => fetchDeleteTodo(id)}
        >
          удалить
        </button>
      </td>
      <td>
        <button className="table__btn btn-green" onClick={handleChangeType}>
          редактировать
        </button>
      </td>
    </tr>
  );
};
