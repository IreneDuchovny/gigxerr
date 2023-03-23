import Select from "react-select";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
// import { gigService } from '../services/gig.service.local'
import { gigService } from "../services/gig.service.js";
import { addGig } from "../store/gig.actions.js";
import { uploadImgToGig } from "../services/cloudinary-service.js";
import {
  categoryOptions,
  doneDayOptions,
} from "../cmps/global-const/global-const";
export function GigEdit() {
  const [gigToEdit, setGigToEdit] = useState(gigService.getEmptyGig());
  const [isReadyPublish, setIsReadyPublish] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const { gigId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!gigId) return;
    gigService.getById(gigId).then(setGigToEdit);
    window.scrollTo(0, 0);
  }, []);

  function handleChange({ target }) {
    let { value, type, name: field } = target;
    value = type === "number" ? +value : value;
    setGigToEdit((prevGig) => ({ ...prevGig, [field]: value }));
  }

  function handleChangeTags(tags) {
    const selectedTags = [];
    tags.forEach((tag) => {
      let { value } = tag;
      selectedTags.push(value);
    });
    setGigToEdit((prevGig) => ({ ...prevGig, tags: selectedTags }));
  }

  function handleChangeDaysToDo(days) {
    let { value } = days;
    setGigToEdit((prevGig) => ({ ...prevGig, daysToMake: +value }));
  }

  async function onAddGig(ev) {
    ev.preventDefault();
    try {
      const savedGig = await addGig(gigToEdit);
      showSuccessMsg(`New gig added - ${savedGig._id}`);
      navigate("/gig");
    } catch (err) {
      showErrorMsg("Cannot add gig");
      throw err;
    }
  }

  async function uploadImg(event) {
    setIsImgLoading(true);
    try {
      const url = await uploadImgToGig(event);
      const urls = gigToEdit.imgUrls;
      urls.push(url);
      setGigToEdit((prevGig) => ({ ...prevGig, imgUrls: urls }));
      setIsImgLoading(false);
      setIsReadyPublish(true);
    } catch (err) {
      console.log("Cannot add image", err);
      throw err;
    }
  }

  return (
    <section className="gig-edit full">
      <form onSubmit={onAddGig}>
        <section className="edit-section">
          <div className="gig-edit-title">
            <h1>Gig title</h1>
            <p>
              As your Gig storefront, your title is the most important place to
              include keywords that buyers would likely use to search for a
              service like yours.
            </p>
          </div>
          <div className="gig-title-desc">
            <textarea
              className="text-input-area"
              type="text"
              name="title"
              maxlength="80"
              value={gigToEdit.title}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="gig-category">
            <h1>Category</h1>
            <p>Choose the categories that are most suitable for your Gig.</p>
          </div>
          <div className="gig-selectors">
            <Select
              isMulti
              name="tags"
              options={categoryOptions}
              theme={(theme) => ({
                ...theme,
                borderRadius: 4,
                colors: { ...theme.colors, primary: "black" },
              })}
              classNamePrefix="select"
              onChange={handleChangeTags}
            />
          </div>

          <div className="desc-info">
            <h1>Description</h1>
            <p>Briefly Describe Your Gig</p>
          </div>
          <div className="gig-description">
            <textarea
              className="text-input-area"
              type="search"
              pattern=".{50,1200}"
              name="description"
              value={gigToEdit.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="gig-price">
            <h1>Scope & Pricing</h1>
            <label htmlFor="gig-price">Price: </label>
            <input
              className="price-input"
              id="gig-price"
              type="number"
              name="price"
              value={gigToEdit.price}
              onChange={handleChange}
            ></input>
          </div>
          <div className="gig-done-days-container">
            <label htmlFor="gig-done-days">Delivery Time </label>
            <Select
              options={doneDayOptions}
              theme={(theme) => ({
                ...theme,
                borderRadius: 4,
                colors: { ...theme.colors, primary: "black" },
              })}
              classNamePrefix="select"
              onChange={handleChangeDaysToDo}
            />
          </div>
          <div className="gallery-info">
            <h1>Showcase Your Services In A Gig Gallery</h1>
            <p>
              Encourage buyers to choose your Gig by featuring a variety of your
              work.
            </p>
          </div>
          <div className="gallery-upload">
            <input onChange={uploadImg} type="file" />
            <h1>Images (up to 3)</h1>
            <p>
              Get noticed by the right buyers with visual examples of your
              services.
            </p>
          </div>
          <div className="about-info">
            <h1>About you</h1>
            <p>A few words about you expirience.</p>
          </div>
          <div className="about-inputs">
            <label htmlFor="about-info">About you:</label>
            <input
              className="text-input"
              name="aboutSeller"
              id="about-info"
              onChange={handleChange}
              type="text"
            />
            <label htmlFor="about-country">Country:</label>
            <input
              className="text-input"
              name="country"
              id="about-country"
              onChange={handleChange}
              type="text"
            />
          </div>
          <button type="submit" className="save-btn" disabled={!isReadyPublish}>
            Publish {isImgLoading && <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </section>
      </form>
    </section>
  );
}
