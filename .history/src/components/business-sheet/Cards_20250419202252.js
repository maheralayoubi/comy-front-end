export const CardData = ({ rank, data }) => {
  return (
    <div className="valueContainer">
      {rank && <img src={/images/rank${rank}.png} alt={rank${rank}} />}
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

  // تحديث البيانات المحلية عند تغيير البيانات الخارجية
  useEffect(() => {
    setUpdatedData({
      [name]: data,
    });
  }, [data, name]);

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
            style={{ rotate: ${180 * !showMore}deg }}
            src="/images/arrow.png"
            alt="arrow"
          />
          <span>{showMore ? "一部を表示" : "もっと見る"}</span>
        </div>
      )}
    </div>
  );
};