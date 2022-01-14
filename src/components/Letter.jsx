export const Letter = (props) => {
  if (props.show) {
    return <span className="letter correct">{props.letter}</span>;
  } else {
    return <span className="letter">?</span>;
  }
};

export const Letters = (props) => {
  if (!props.letters.length) {
    return <h1>Wrapping rope around someones neck...</h1>;
  }

  return (
    <>
      {props.letters.map((value, index) => (
        <Letter key={index} letter={value.character} show={value.isShown} />
      ))}
    </>
  );
};
