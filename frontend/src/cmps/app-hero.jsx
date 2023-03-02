import { useEffect, useState } from "react";
import { gigService } from "../services/gig.service";
import { useSearchParams, useNavigate } from "react-router-dom";
import { setFilter } from "../store/gig.actions.js";
import { StarSvg } from "../cmps/git-preview-svgs/star-svg";

export function AppHero() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryFilterBy = gigService.getFilterFromSearchParams(searchParams);
  const [filterByToEdit, setFilterByToEdit] = useState(queryFilterBy);
  const [imgToDisplay, setImgToDisplay] = useState(1);
  const [heroTextToDisplay, setHeroTextToDisplay] = useState(
    "Moon, Marketing Expert"
  );

  useEffect(() => {
    heroImgSwitch();
  }, []);

  useEffect(() => {}, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, [field]: value };
    });
  }
  function handleSubmit(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }
  function onSetFilter(filterBy) {
    setFilter(filterBy);
    navigate(`/gig?title=${filterBy.title}`);
  }
  function heroImgSwitch() {
    setInterval(() => {
      setImgToDisplay((prevImg) => {
        if (prevImg >= 6) {
          setImgToDisplay((prev) => {
            heroTextSwitch(1);
            return (prev = 1);
          });
        }
        prevImg += 1;
        heroTextSwitch(prevImg);

        return prevImg;
      });
    }, 7000);
  }

  function heroTextSwitch(heroImg) {
    switch (heroImg) {
      case 1:
        setHeroTextToDisplay(" Moon, Marketing Expert");
        break;
      case 2:
        setHeroTextToDisplay("Rikita, Shoemaker and Desighner");
        break;
      case 3:
        setHeroTextToDisplay("Zack, Bar Owner");
        break;
      case 4:
        setHeroTextToDisplay("Gabrielle, Video Editor");
        break;
      case 5:
        setHeroTextToDisplay("Andrea, Fasion Designer");
        break;
        case 6:
          setHeroTextToDisplay("Valentina, AI Artist");
          break;
      default:
    }
  }

  return (
    <section className="hero-container main-container full flex">
      <div
        className={`img-container${imgToDisplay}
} full main-container flex`}
>
        <div className="hero-info ">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <form
            type="submit"
            onSubmit={handleSubmit}
            className="flex align-center search-container"
          >
            <label htmlFor="gigTitle"></label>
            <div className="search-hero-section flex">
            <div className="search-icon-box flex">
              <span className="material-symbols-outlined search-icon">
                search
              </span>
            </div>
            <input
              className="search-box"
              type="text"
              id="gigTitle"
              name="title"
              value={filterByToEdit.title}
              onChange={handleChange}
              placeholder="Try ''building mobile app''"
            />
            </div>
            <button
              className="search-btn"
              onClick={() => {
                onSetFilter(filterByToEdit);
              }}
            >
              Search
            </button>
          </form>
          <div className="popular-tags flex">
            <p>Popular:&nbsp;</p>
            <button>Website Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>Video Editing</button>
          </div>
        </div>
        <div className="hero-name flex">
          <div className="flex">
            <StarSvg />
            <StarSvg />
            <StarSvg />
            <StarSvg />
            <StarSvg />
          </div>
          <p className="flex">{heroTextToDisplay}</p>
        </div>
      </div>
    </section>
  );
}
