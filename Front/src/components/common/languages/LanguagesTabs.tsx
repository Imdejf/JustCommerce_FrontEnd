interface Props {
    tabs: Array<{ id:string; flagFilePath: string; nameOrginal: string }>;
    onLanguageValueHandle: (value: string) => void;
  }

const LanguageForm: React.FC<Props> = ({tabs, onLanguageValueHandle}) => {
    
    function handleChange(id:string) {
        onLanguageValueHandle(id);
      }

    return (
        
        <div className="overflow-x-hidden flex border-t-2 border-black border-opacity-20">
          <div className="w-full flex justify-between">
            <div className="justify-start w-1/3">
              <div
                  className={`flex justify-center mx-0 items-center flex-shrink-0 relative 
                  bg-white bg-opacity-50 
                  hover:bg-opacity-90 
                  w-36 h-12 
                  rounded-b-md cursor-pointer 
                  text-sm
                  transition-opacity duration-150
                  
                  `}
                  onClick={() => handleChange("")}
                >
                    <span className="capitalize-first">Domyślny</span>
                </div>
            </div>
            <div className="flex justify-end w-1/3">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`flex justify-center mx-0 items-center flex-shrink-0 relative 
                  bg-white bg-opacity-50 
                  hover:bg-opacity-90 
                  w-36 h-12 
                  rounded-b-md cursor-pointer 
                  text-sm
                  transition-opacity duration-150
                  `}
                  onClick={() => handleChange(tab.id)}
                >
                  <span className="capitalize-first">{tab.nameOrginal}</span>
                </div>
              ))}
              </div>
              <div className="w-1/3">
              </div>
          </div>
        </div>
    )
}

export default LanguageForm;