const FoodComponent = ({name , image_url}) => {
  return (
    <div>
        <img src={image_url} alt={name} />
      <h1>{name}</h1>
    </div>
  );
};

export default FoodComponent;
