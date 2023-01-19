import { Link } from 'react-router-dom'
import { FavSvg } from './git-preview-svgs/fav-svg'
import { MenuSvg } from './git-preview-svgs/menu-svg'
import { StarSvg } from './git-preview-svgs/star-svg'

export function GigPreview({ gig, onRemoveGig, onUpdateGig, onAddGigMsg, onAddToGigt }) {
    return (
        <Link to={`/gig/${gig._id}`}>
            {' '}
            <li className='gig-preview flex' key={gig._id}>
                <img src={require('../assets/img/gig-preview/preview-img.jpg')}></img>
                <div className='seller-info'>
                    <span class='material-symbols-outlined seller-icon'>account_circle</span>
                    <h4>{gig.owner.fullname}</h4>
                </div>
                <p>{gig.description.substring(0, 50) + '...'}</p>
                <div className='likes flex'>
                    {/* <!-- License: MIT. Made by feathericon: https://github.com/feathericon/feathericon --> */}
                    <svg className='star-box' width='18px' height='18px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xlink='http://www.w3.org/1999/xlink'>
                        <title>star</title>
                        <desc>Created with sketchtool.</desc>
                        <g id='shape' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                            <g className='gig-preview-star' fill-rule='nonzero'>
                                <polygon
                                    id='Shape'
                                    points='12.5 17.9252329 6.62867711 21 7.75 14.4875388 3 9.8753882 9.56433855 8.92523292 12.5 3 15.4356614 8.92523292 22 9.8753882 17.25 14.4875388 18.3713229 21'
                                ></polygon>
                            </g>
                        </g>
                    </svg>
                    <span className='rate'> {gig.owner.rate}</span>
                    <span className='total-likes'>{`(${gig.totalLikes})`}</span>
                </div>
                <hr />

                <section className='gig-preview-footer flex space-between'>
                    <div className='preview-footer-opt'>
                        <MenuSvg />
                        <FavSvg />
                    </div>

                    <div className='price-container flex'>
                        <span className='price-preview'>STARTING AT</span>
                        <span className='price-tag'> {gig.price}</span>
                    </div>
                </section>
                {/* <div>
                    <button
                        onClick={() => {
                            onRemoveGig(gig._id)
                        }}
                    >
                        x
                    </button>
                    <button
                        onClick={() => {
                            onUpdateGig(gig)
                        }}
                    >
                        Edit
                    </button>
                </div>

                <button
                    onClick={() => {
                        onAddGigMsg(gig)
                    }}
                >
                    Add gig msg
                </button>
                <button
                    className='buy'
                    onClick={() => {
                        onAddToGigt(gig)
                    }}
                >
                    Add to gigt
                </button> */}
            </li>
        </Link>
    )
}
