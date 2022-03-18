import { useState } from "react";
import useAsync from "../hooks/useAsync";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import './ReviewForm.css';

const INITIAL_VALUES = {
  title: '',
  rating: 0,
  content: '',
  imgFile: null,
}

function ReviewForm({ 
  initialValues=INITIAL_VALUES, 
  initialPreview, 
  onCancel,
  onSubmit,
  onSubmitSuccess,
}) {
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const [values, setValues] = useState(initialValues)

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    handleChange(name, value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('rating', values.rating);
    formData.append('content', values.content);
    formData.append('imgFile', values.imgFile);

    const result = await onSubmitAsync(formData);
    if(!result) return;

    const { review } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(review);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleInputChange}></input>
      <FileInput name="imgFile" value={values.imgFile} initialPreview={initialPreview} onChange={handleChange} />
      <RatingInput name='rating' value={values.rating} onChange={handleChange} />
      <textarea  name="content" value={values.content} onChange={handleInputChange} />
      <button type="submit" disabled={isSubmitting}>확인</button>
      {onCancel && <button onClick={onCancel}>취소</button>}

      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  )
}

export default ReviewForm;