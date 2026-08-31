const Requestes = ({showRequest, setShowRequests, likedUsers, interestTags, navigate}) =>{


    const linkClass = ({ isActive }) =>
  [
    'relative inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200',
    isActive ? 'text-[#1A1916]' : 'text-[#5C574F] hover:text-[#C4782A]',
    'after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-[calc(100%-0.5rem)] after:-translate-x-1/2 after:rounded-full after:bg-[#C4782A] after:content-[""]',
    isActive ? 'after:opacity-100' : 'after:opacity-0 hover:after:opacity-100',
  ].join(' ')

    return (

        <>
             <div className="absolute left-0 top-full z-50 mt-2 w-[340px] rounded-2xl border border-[#E8E0D5] bg-white p-3 shadow-xl shadow-[#2C2A26]/10">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A39E96]">
                    Requests
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowRequests(false)}
                    className="text-xs text-[#A39E96] hover:text-[#5C574F]"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A39E96]">
                      Received likes
                    </p>
                    {likedUsers.length > 0 ? (
                      <div className="space-y-2">
                        {likedUsers.map((likedUser, index) => {
                          const likedUserId = likedUser?._id || likedUser?.id
                          const likedUserName = likedUser?.name || 'User'
                          const likedUserLocation = likedUser?.location || 'Location unavailable'
                          const likedUserAvatar =
                            likedUser?.avatar || likedUser?.image || likedUser?.profilePic

                          return (
                            <div
                              key={likedUserId || index}
                              className="flex items-center gap-3 rounded-xl border border-[#E8E0D5] bg-[#FBF8F4] p-2.5"
                            >
                              <img
                                src={likedUserAvatar || 'https://via.placeholder.com/72'}
                                alt={likedUserName}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-[#1A1916]">
                                  {likedUserName}
                                </p>
                                <p className="truncate text-[11px] text-[#A39E96]">
                                  {likedUserLocation}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => navigate(`/profile/${likedUserId}`)}
                                className="rounded-lg bg-[#C4782A] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#A8651F]"
                              >
                                View
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="rounded-xl border border-dashed border-[#E8E0D5] bg-[#FBF8F4] px-3 py-4 text-xs text-[#A39E96]">
                        No one has liked your profile yet.
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A39E96]">
                      Interests
                    </p>
                    {interestTags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {interestTags.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[#E8E0D5] bg-[#FBF8F4] px-2.5 py-1 text-xs text-[#5C574F]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="rounded-xl border border-dashed border-[#E8E0D5] bg-[#FBF8F4] px-3 py-4 text-xs text-[#A39E96]">
                        No interests added yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
        
        
        </>


    )




}

export default Requestes;