import React, { useState } from "react";
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";

const BottomSec = ({ activeView, setActiveView, selectedMilestone, setSelectedMilestone }) => {
  // ── State for Data ──
  const [scopeItems, setScopeItems] = useState([
    "Develop a mobile app with core features and user registration",
    "Implement payment gateway integration",
    "",
  ]);
  
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      name: "Milestone 1 - Wireframe Designing",
      description: "Develop a mobile app with core features",
      dueDate: "15th April, 2026",
      status: "Awaiting Response",
      duration: "20 Days",
      budgetMin: "",
      budgetMax: "",
      timelineFrom: "",
      timelineTo: "",
    },
    {
      id: 2,
      name: "Milestone 2 - UI/UX Design",
      description: "Design system and high fidelity screens",
      dueDate: "20th May, 2026",
      status: "Awaiting Response",
      duration: "30 Days",
      budgetMin: "",
      budgetMax: "",
      timelineFrom: "",
      timelineTo: "",
    }
  ]);

  // ── Handlers ──
  const handleEditMilestone = (m) => {
    setSelectedMilestone(m);
    setActiveView('editMilestone');
  };

  const handleAddMilestone = () => {
    const newM = {
      id: Date.now(),
      name: "New Milestone",
      description: "",
      dueDate: "",
      status: "Draft",
      duration: "0 Days",
      budgetMin: "",
      budgetMax: "",
      timelineFrom: "",
      timelineTo: "",
    };
    setSelectedMilestone(newM);
    setActiveView('addMilestone');
  };

  const handleEditScope = () => {
    setActiveView('scope');
  };

  const [newScopeInput, setNewScopeInput] = useState("");

  const handleAddScopeItem = () => {
    if (newScopeInput.trim() === "") return;
    setScopeItems([...scopeItems, newScopeInput.trim()]);
    setNewScopeInput("");
  };

  const handleRemoveScopeItem = (index) => {
    const updated = scopeItems.filter((_, i) => i !== index);
    setScopeItems(updated);
  };

  const handleScopeItemChange = (index, value) => {
    const updated = [...scopeItems];
    updated[index] = value;
    setScopeItems(updated);
  };

  // ── UI Components ──

  const Card = ({ title, children, className = "" }) => (
    <div className={`bg-white rounded-2xl lg:px-6 px-3 py-3  shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-medium text-[#000000] ">{title}</h3>
      </div>
      {children}
    </div>
  );

  const MilestoneItem = ({ milestone }) => (
    <div className="bg-[#F1F1F1] rounded-xl lg:p-4 p-2 mb-4 last:mb-0 border border-transparent hover:border-[#D8D6F8] transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex lg:gap-4  gap-2">
          <div className="lg:w-4 lg:h-4 w-2 h-2 rounded-full bg-[#D8D6F8] mt-1.5 shrink-0" />
          <div>
            <h4 className="text-[#000000] text-xs lg:text-sm">{milestone.name}</h4>
            <p className="lg:text-xs text-[10px] text-[#000000] mt-1">{milestone.description}</p>
            <p className="lg:text-xs text-[10px] text-[#999999] mt-2">Due Date - {milestone.dueDate}</p>
          </div>
        </div>
        <div className="flex flex-col  items-end gap-3">
          <span className="bg-[#EAB308]  text-white lg:text-[9px] text-[6px] w-[70px] lg:w-auto px-2 py-0.5 rounded-md font-medium">
            {milestone.status}
          </span>
          <button 
            onClick={() => handleEditMilestone(milestone)}
            className="lg:px-6 px-2 py-1  bg-white border border-gray-200 lg:rounded-md rounded-sm lg:text-xs text-[8px] font-semibold text-[#59549F] hover:bg-gray-50 transition-all shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 px-2 lg:px-4 py-4 bg-[#FDFDFF]">
      
      {/* ── LEFT COLUMN (Project Overview) ── */}
      <div className={`flex-1 space-y-4 max-h-[610px] overflow-y-auto p-2 scrollbar-hide mb-4 ${activeView !== 'none' ? 'hidden lg:block' : 'block'}`}>
        
        {/* Scope of Work summary */}
        <Card title="Scope of Work">
          <ul className=" mb-2">
            {scopeItems.slice(0, 2).map((item, i) => (
              <li key={i} className="text-[#000000] text-sm">{item}</li>
            ))}
          </ul>
          <button 
            onClick={handleEditScope}
            className="w-full mt-7 py-2 bg-[#D8D6F8] rounded-xl text-[#000000] font-medium text-sm hover:opacity-90 transition-all shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
          >
            Add Details
          </button>
        </Card>

        {/* Total Budget card */}
        <Card title="Total Budget">
          <div className="flex flex-wrap gap-3 mt-4 mb-2">
            <div className="lg:w-[150px] w-full px-4 py-1.5 bg-[#F8F8F8] rounded-lg text-xs text-[#666666] border border-gray-100 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center">
              INR - Indian Rupees
            </div>
            <input 
              type="number" 
              placeholder="Total Budget"
              className="px-4 py-1.5  bg-white border border-gray-200 rounded-lg text-xs flex-1 outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center"
            />
          </div>
        </Card>

        {/* Total Timeline card */}
        <Card title="Total Timeline">
          <div className="flex flex-wrap gap-3 mt-4 mb-2">
            <div className="lg:w-[150px] w-full px-4 py-1.5 bg-[#F8F8F8] rounded-lg text-xs text-[#666666] border border-gray-100 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center">
              Total Days
            </div>
            <input 
              type="text" 
              placeholder="Total Days"
              className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs flex-1 outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] text-center"
            />
          </div>
        </Card>

        {/* Milestones Card */}
        <Card title="Milestone" className="relative">
          <button 
            onClick={handleAddMilestone}
            className="absolute top-3 right-6 text-[#59549F] hover:scale-110 transition-transform"
          >
            <FiPlus size={24} className="border-2 border-[#59549F] rounded-full p-0.5" />
          </button>
          <div className="mt-4 pr-2"> 
            {milestones.map(m => <MilestoneItem key={m.id} milestone={m} />)}
          </div>
        </Card>
      </div>

      {/* ── RIGHT COLUMN (Editor View) ── */}
      <div className={`lg:w-[450px] xl:w-[550px] flex flex-col gap-4 ${activeView === 'none' ? 'hidden lg:block' : 'block'}`}>
        
        {/* Editor Wrapper */}
        <div className={`bg-white rounded-2xl lg:px-6 px-3 pt-4 mt-2 pb-6 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col relative transition-all duration-300 ${activeView === 'none' ? 'h-[610px]' : 'h-[550px]'} overflow-y-auto scrollbar-hide`}>
          
          {/* Mobile Back Header */}
          <div className="lg:hidden flex items-center gap-3 mb-3">
            <button onClick={() => setActiveView('none')} className="p- bg-gray-50 rounded-full text-[#59549F]">
              <FiArrowLeft size={20} />
            </button>
            <span className="font-bold text-lg">Back to List</span>
          </div>

          {activeView === 'none' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <IoMdCheckmark size={40} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-400">No Details Selected</h3>
              <p className="text-sm text-gray-400 mt-1 italic">Click "Add Details" on any section to start editing your draft.</p>
            </div>
          )}

          {activeView === 'scope' && (
            <div className="flex-1">
               <h3 className="text-lg font-medium text-[#000000] mb-2 px-1 ">Scope of Work</h3>
               <div className="space-y-2 lg:p-3 px-3 py-3 -m-3">
                  {scopeItems.map((item, index) => (
                    <div key={index} className="relative group">
                      <input 
                        type="text" 
                        value={item} 
                        onChange={(e) => handleScopeItemChange(index, e.target.value)}
                        placeholder="Define scope item..."
                        className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-xl text-xs focus:border-[#59549F] outline-none transition-all pr-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                      />
                      <button 
                        onClick={() => handleRemoveScopeItem(index)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-light text-gray-400 hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Add more..." 
                      value={newScopeInput}
                      onChange={(e) => setNewScopeInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddScopeItem()}
                      className="w-full px-5 py-3 bg-[#FDFDFF] border border-gray-100 rounded-xl text-xs focus:border-[#59549F] outline-none transition-all pr-12 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                    />
                    <button 
                      onClick={handleAddScopeItem}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-light text-gray-400 hover:text-[#59549F] transition-colors"
                    >
                      +
                    </button>
                  </div>
               </div>
 
               <div className="mt-4 mb-2">
                  <h4 className="text-lg font-medium text-[#000000] mb-2 px-1">Description</h4>
                  <textarea 
                    placeholder="Add the Description"
                    className="w-full min-h-[150px] lg:p-6 p-3 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-sm focus:border-[#59549F] outline-none resize-none placeholder:italic shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                  />
               </div>

               <div className="flex gap-4 mt-3">
                  <button 
                    onClick={() => setActiveView('none')}
                    className="flex-1 py-1 bg-[#D8D6F8] text-[#59549F] font-semibold rounded-lg hover:opacity-90 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                  >
                    Save
                  </button>
                  <button onClick={() => setActiveView('none')} className="flex-1 py-1 bg-white border border-[#000000]/20 text-gray-600 font-semibold rounded-lg hover:bg-gray-50">Cancel</button>
               </div>
            </div>
          )}

          {(activeView === 'editMilestone' || activeView === 'addMilestone') && selectedMilestone && (
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="lg:text-lg text-sm font-medium text-[#1A1A1A]">{selectedMilestone.name || "New Milestone"}</h3>
                   <span className="bg-[#B31E21] text-white lg:text-[10px] text-[8px] lg:px-3 px-2 py-1.5 rounded-full font-bold">
                     Duration - {selectedMilestone.duration || "0 Days"}
                   </span>
                </div>

                <div className="space-y-4">
                   {/* Milestone Budget */}
                   <div className="bg-white border border-gray-100 rounded-2xl px-3 lg:px-6 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                      <h4 className="text-sm font-medium text-[#000000] mb-4">Budget - {selectedMilestone.name || "Milestone"}</h4>
                      <div className="flex gap-3 mb-2">
                        <div className="w-[150px] px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">INR - Indian Rupees</div>
                        <input 
                          type="number" 
                          placeholder="Total Budget"
                          defaultValue={selectedMilestone.budgetMin}
                          className="flex-1 px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                        />
                      </div>
                   </div>

                   {/* Milestone Timeline */}
                   <div className="bg-white border border-gray-100 rounded-2xl lg:px-6 px-3 py-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                      <h4 className="text-sm font-medium text-[#000000] mb-4">Timeline - {selectedMilestone.name || "Milestone"}</h4>
                      <div className="flex gap-3 mb-2 ">
                        <div className="w-[150px] px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] text-gray-400 whitespace-nowrap text-center shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]">Total Days</div>
                        <input 
                          type="text" 
                          placeholder="Total Days" 
                          defaultValue={selectedMilestone.duration}
                          className="flex-1 px-3 py-2 bg-[#FDFDFF] border border-gray-100 rounded-lg text-[10px] outline-none focus:border-[#D8D6F8] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                        />
                      </div>
                   </div>

                   {/* Milestone Scope */}
                   <div className=" ">
                      <h4 className="text-sm font-medium text-[#000000] mb-3">Scope of work in {selectedMilestone.name || "milestone"}</h4>
                      <textarea 
                        placeholder="Add Description"
                        defaultValue={selectedMilestone.description}
                        className="w-full lg:h-37 h-30 lg:p-6 p-3 bg-[#FDFDFF] border border-gray-100 rounded-2xl text-sm focus:border-[#59549F] outline-none resize-none placeholder:italic shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                      />
                   </div>
                </div>

                <div className="flex gap-4 mt-3">
                  <button onClick={() => setActiveView('none')} className="flex-1 lg:py-2 py-1 bg-[#D8D6F8] text-[#59549F] font-medium rounded-sm lg:rounded-xl hover:opacity-90 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]">
                    {activeView === 'addMilestone' ? 'Add Milestone' : 'Save'}
                  </button>
                  <button onClick={() => setActiveView('none')} className="flex-1 lg:py-2 py-1 bg-white border border-[#59549F]/20 text-gray-600 font-medium rounded-sm lg:rounded-xl hover:bg-gray-50 shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]">Cancel</button>
               </div>
            </div>
          )}
          
        </div>

        {/* Global Submit Button */}
        {activeView !== 'none' && (
          <button className="w-full py-2 bg-[#D8D6F8] text-[#59549F] rounded-lg hover:bg-[#D8D6F8]/90 transition-all text-sm shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] font-semibold tracking-wider">
            Submit Draft
          </button>
        )}

      </div>
    </div>
  );
};

export default BottomSec;