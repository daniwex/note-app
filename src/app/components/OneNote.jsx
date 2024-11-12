import Image from "next/image";

export default function OneNote({
  noteTitle,
  onChangeTitle,
  noteTags = [],
  onChangeTag,
  noteModified,
  onChangeDate,
  noteBody = "", 
  onChangeBody
}) {
  return (
    <div className="w-full h-full flex">
      <div className="basis-4/5 border-r h-full">
        <div className="h-5/6">
          <div className="border-b p-4">
            <input
              type="text"
              placeholder="Enter a title..."
              className="border-none placeholder:font-bold text-black placeholder:text-black font-bold bg-transparent focus:outline-none w-full"
              value={noteTitle || ""}
              onChange={(e) => onChangeTitle(e.target.value)}
            />
            <div className="mt-5 flex flex-col gap-y-2">
              <div className="flex gap-x-24">
                <div className="flex text-sm gap-x-2 w-10">
                  <Image
                    src="/assets/images/icon-tag.svg"
                    alt="tags"
                    width="15"
                    height="15"
                  />
                  <span>Tags</span>
                </div>
                <input
                  className="border-none w-1/2 placeholder:text-[#99A0AE] text-black block text-sm bg-transparent focus:outline-none"
                  placeholder="Add tags separated by commas (e.g Work, Planning)"
                  value={noteTags || ""}
                  onChange={(e) => onChangeTag(e.target.value)}
                />
              </div>
              <div className="flex gap-x-10">
                <div className="flex text-sm gap-x-2 w-27">
                  <Image
                    src="/assets/images/icon-clock.svg"
                    alt="last edited"
                    width="15"
                    height="15"
                  />
                  <span>Last edited</span>
                </div>
                <input
                  className="border-none w-1/2 placeholder:text-[#99A0AE] text-black block text-sm bg-transparent focus:outline-none"
                  placeholder="Not yet saved"
                  value={noteModified || ""}
                  onChange={(e) => onChangeDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="h-4/5">
            <textarea 
              className="w-full text-sm focus:outline-none h-full bg-transparent p-4 resize-none"
              placeholder="Start typing your note here..."
              value={noteBody}
              onChange={(e) => onChangeBody(e.target.value)}
            />
          </div>
        </div>
        <div className="h-1/6 p-4">
          <div className="border-t text-sm flex gap-x-3 pt-2 ">
            <button className="bg-[#335CFF] text-white py-1 px-2 rounded-md">
              Save Note
            </button>
            <button className="bg-[#5258662e] text-black py-1 px-2 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
