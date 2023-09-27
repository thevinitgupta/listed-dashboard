import React from 'react'


const Modal = ({ open, children, onClose, fig }) => {
        if (!open) return null
      
        return (
            <div className="fixed bg-black/50 inset-0 flex items-center justify-center p-4">
          <div 
          className={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[580px] w-[620px] p-0 bg-white rounded-2xl flex flex-col justify-start`}
              
            >
              {children}
            </div>
          </div>
        )
      }

export default Modal