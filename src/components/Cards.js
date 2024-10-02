import "./styles/Cards.scss";
import { useState } from "react";
import EditModal from "./EditModal";
import { TextArea, Input } from "./FormElements";

export const SectionTitle = ({
  title,
  theme,
  isEdit,
  data,
  name,
  placeholder,
  maxLength,
  handleEdit,
}) => {
  const [updatedData, setUpdatedData] = useState({
    [name]: data,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditData = async () => {
    await handleEdit(updatedData);
  };

  return (
    <div
      className={`sectionTitle ${isEdit ? "space" : ""}`}
      style={{ backgroundColor: theme ? theme : "#aaa" }}
    >
      <span>{title}</span>
      {isEdit && (
        <EditModal
          size={"sm"}
          title={title}
          handleEdit={handleEditData}
          theme={theme}
        >
          <TextArea
            placeholder={placeholder}
            maxLength={maxLength}
            value={updatedData?.[name]}
            onChange={handleChange}
            name={name}
          />
        </EditModal>
      )}
    </div>
  );
};

export const CardTitle = ({
  title,
  theme,
  name,
  handleEdit,
  data,
  placeholder,
  isEdit,
  maxLength,
}) => {
  const [updatedData, setUpdatedData] = useState({
    [name]: data,
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    data[index] = value;
    const newArray = [...data];

    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: newArray,
    }));
  };

  const handleEditData = async () => {
    await handleEdit(updatedData);
  };

  return (
    <div
      className="cardTitle"
      style={{ backgroundColor: theme ? theme : "#aaa" }}
    >
      <img src={`/images/${name}.png`} alt={name} />
      <p>{title}</p>
      {isEdit && (
        <EditModal
          size={"sm"}
          title={title}
          theme={theme}
          handleEdit={handleEditData}
        >
          {data?.map((item, index) => (
            <Input
              key={index}
              index={index}
              lable={`エリア${index + 1}`}
              placeholder={placeholder}
              maxLength={maxLength}
              value={item}
              onChange={(e) => handleChange(e, index)}
              name={name}
            />
          ))}
        </EditModal>
      )}
    </div>
  );
};

export const CardTitle2 = ({
  title,
  theme,
  name,
  handleEdit,
  data,
  placeholder,
  isEdit,
  maxLength,
}) => {
  const [updatedData, setUpdatedData] = useState({
    [name]: data,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditData = async () => {
    await handleEdit(updatedData);
  };

  return (
    <div
      className="cardTitle"
      style={{ backgroundColor: theme ? theme : "#999999" }}
    >
      <img src={`/images/${name}.png`} alt={name} />
      <p>{title}</p>
      {isEdit && (
        <EditModal
          size={"sm"}
          title={title}
          theme={theme}
          handleEdit={handleEditData}
        >
          <TextArea
            placeholder={placeholder}
            maxLength={maxLength}
            value={updatedData?.[name]}
            onChange={handleChange}
            name={name}
          />
        </EditModal>
      )}
    </div>
  );
};

export const CardData = ({ rank, data }) => {
  return (
    <div className="valueContainer">
      {rank && <img src={`/images/rank${rank}.png`} alt={`rank${rank}`} />}
      <p>
        {data ? data : <span className="no-content">データがありません</span>}
      </p>
    </div>
  );
};

export const Card = ({
  title,
  data,
  theme,
  isEdit,
  handleEdit,
  name,
  placeholder,
  maxLength,
}) => {
  const lines = data?.split("\n");

  return (
    <div className="card">
      <SectionTitle
        title={title}
        theme={theme}
        isEdit={isEdit}
        data={data}
        handleEdit={handleEdit}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <div className="cardContent">
        {data ? (
          lines.map((item, index) => <p key={index}>{item}</p>)
        ) : (
          <span className="no-content">データがありません</span>
        )}
      </div>
    </div>
  );
};

export const ChildCard = ({
  title,
  data,
  theme,
  isEdit,
  handleEdit,
  placeholder,
  maxLength,
  name,
}) => {
  const [showMore, setShowMore] = useState(0);
  const lines = data?.split("\n");

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const [updatedData, setUpdatedData] = useState({
    [name]: data,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditData = async () => {
    await handleEdit(updatedData);
  };

  return (
    <div className="ChildCard">
      <div className="title">
        <span>{title}</span>
        {isEdit && (
          <EditModal
            size={"sm"}
            title={title}
            theme={theme}
            handleEdit={handleEditData}
          >
            <TextArea
              placeholder={placeholder}
              maxLength={maxLength}
              value={updatedData?.[name]}
              onChange={handleChange}
              name={name}
            />
          </EditModal>
        )}
      </div>
      <div
        className="cardContent"
        style={showMore ? {} : { WebkitLineClamp: 4, lineClamp: 4 }}
      >
        {data ? (
          lines.map((item, index) => <p key={index}>{item}</p>)
        ) : (
          <span className="no-content">データがありません</span>
        )}
      </div>
      {data && (
        <div className="showMore" onClick={toggleShowMore}>
          <img
            style={{ rotate: `${180 * !showMore}deg` }}
            src="/images/arrow.png"
            alt="arrow"
          />
          <span>一部を表示</span>
        </div>
      )}
    </div>
  );
};
