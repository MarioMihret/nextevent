"use client"
import React, { useState } from 'react';
import { 
  Calendar, MapPin, DollarSign, Users, Video, X, ArrowLeft, 
  ArrowRight, Check, Building2, Link2, GraduationCap, 
  Image as ImageIcon, Mic, Building 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventFormProps {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

type FormStep = 'basics' | 'category' | 'details' | 'speakers' | 'capacity' | 'review';

interface FormData {
  title: string;
  date: string;
  category: string;
  universityName: string;
  eventType: 'physical' | 'virtual';
  location?: string;
  meetingLink?: string;
  description: string;
  isFree: boolean;
  price: number | "";         // Ensures price can be either a number or an empty string
  maxAttendees: number | "";  // Ensures maxAttendees can be either a number or an empty string
  speakerName: string;
  speakerBio: string;
  sponsorName: string;
  sponsorLogo: string;
  eventImage: string;
}

const categories = [
  'Academic', 'Cultural', 'Sports', 'Workshop', 'Seminar', 
  'Conference', 'Career Fair', 'Social', 'Other'
];

const universities = [
  'Addis Ababa University', 'Bahir Dar University', 'Jimma University', 
  'Hawassa University', 'Mekelle University', 'Adama Science and Technology University', 'Other'
];

const EventForm: React.FC<EventFormProps> = ({ onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>('basics');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    date: '',
    category: '',
    universityName: '',
    eventType: 'physical',
    location: '',
    meetingLink: '',
    description: '',
    isFree: true,    // Ensured isFree exists in initial state
    price: '',       // Numeric inputs should default to ""
    maxAttendees: '',
    speakerName: '',
    speakerBio: '',
    sponsorName: '',
    sponsorLogo: '',
    eventImage: '',
  });

  const steps: FormStep[] = ['basics', 'category', 'details', 'speakers', 'capacity', 'review'];
  const currentStepIndex = steps.indexOf(currentStep);

  // Updated to support both string and number types
  const updateFormData = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // ✅ Pass formData as an object
  };
  

  const generateMeetingLink = () => {
    const baseUrl = 'meet.jit.si';
    const roomId = `${formData.universityName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    const meetingLink = `https://${baseUrl}/${roomId}`;
    updateFormData('meetingLink', meetingLink);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'eventImage' | 'sponsorLogo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData(field, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isStepComplete = (step: FormStep): boolean => {
    switch (step) {
      case 'basics':
        return !!formData.title && !!formData.date && !!formData.eventImage;
      case 'category':
        return !!formData.category && !!formData.universityName;
      case 'details':
        return !!formData.description && (
          formData.eventType === 'virtual' ? !!formData.meetingLink : !!formData.location
        );
      case 'speakers':
        return !!formData.speakerName && !!formData.speakerBio;
      case 'capacity':
        return !!formData.price && !!formData.maxAttendees;
      case 'review':
        return true;
    }
  };

  const canProceed = isStepComplete(currentStep);

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mt-2">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full 
              ${currentStepIndex >= index 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-700 text-gray-400'}`}
          >
            {currentStepIndex > index ? (
              <Check className="w-5 h-5" />
            ) : (
              index + 1
            )}
          </div>
          {index < steps.length - 1 && (
            <div 
              className={`w-12 h-1 mx-2 
                ${currentStepIndex > index 
                  ? 'bg-purple-500' 
                  : 'bg-gray-700'}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basics':
        return (
          <div className="space-y-6 ">
            <div>
              <label className="block mb-2 text-gray-300">Event Title</label>
              <input
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Enter event title"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Date and Time</label>
              <input
                type="datetime-local"
                value={formData.date}
                onChange={(e) => updateFormData('date', e.target.value)}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Event Image</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'eventImage')}
                  className="hidden"
                  id="eventImage"
                />
                <label
                  htmlFor="eventImage"
                  className="flex items-center gap-2 px-4 py-2 transition-colors bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
                >
                  <ImageIcon className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Upload Image</span>
                </label>
                {formData.eventImage && (
                  <img
                    src={formData.eventImage}
                    alt="Event preview"
                    className="object-cover w-16 h-16 rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        );

      case 'category':
        return (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-300">Event Category</label>
              <select
                value={formData.category}
                onChange={(e) => updateFormData('category', e.target.value)}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-300">University</label>
              <select
                value={formData.universityName}
                onChange={(e) => updateFormData('universityName', e.target.value)}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="">Select a university</option>
                {universities.map(university => (
                  <option key={university} value={university}>{university}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-300">Event Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={formData.eventType === 'physical'}
                    onChange={() => updateFormData('eventType', 'physical')}
                    className="text-purple-500"
                  />
                  <span className="text-white">Physical Event</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={formData.eventType === 'virtual'}
                    onChange={() => {
                      updateFormData('eventType', 'virtual');
                      generateMeetingLink();
                    }}
                    className="text-purple-500"
                  />
                  <span className="text-white">Virtual Event</span>
                </label>
              </div>
            </div>
            
            {formData.eventType === 'virtual' ? (
              <div>
                <label className="block mb-2 text-gray-300">Meeting Link</label>
                <div className="flex gap-2">
                  <input
                    value={formData.meetingLink}
                    readOnly
                    className="flex-1 p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={generateMeetingLink}
                    className="px-4 py-2 text-white transition-colors bg-purple-500 rounded-lg hover:bg-purple-600"
                  >
                    <Link2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="block mb-2 text-gray-300">Location</label>
                <input
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Enter location"
                />
              </div>
            )}
            
            <div>
              <label className="block mb-2 text-gray-300">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                className="w-full h-32 p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Enter event description"
              />
            </div>
          </div>
        );

      case 'speakers':
        return (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-300">Speaker Name</label>
              <input
                value={formData.speakerName}
                onChange={(e) => updateFormData('speakerName', e.target.value)}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Enter speaker name"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Speaker Bio</label>
              <textarea
                value={formData.speakerBio}
                onChange={(e) => updateFormData('speakerBio', e.target.value)}
                className="w-full h-32 p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Enter speaker bio"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300">Sponsor Information</label>
              <input
                value={formData.sponsorName}
                onChange={(e) => updateFormData('sponsorName', e.target.value)}
                className="w-full p-3 mb-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                placeholder="Enter sponsor name"
              />
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'sponsorLogo')}
                  className="hidden"
                  id="sponsorLogo"
                />
                <label
                  htmlFor="sponsorLogo"
                  className="flex items-center gap-2 px-4 py-2 transition-colors bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
                >
                  <Building className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Upload Sponsor Logo</span>
                </label>
                {formData.sponsorLogo && (
                  <img
                    src={formData.sponsorLogo}
                    alt="Sponsor logo preview"
                    className="object-contain w-16 h-16 rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        );

        case 'capacity':
          return (
            <div className="space-y-6">
              {/* Free or Paid Toggle */}
              <div>
                <label className="block mb-2 text-gray-300">Event Pricing</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="pricing"
                      value="free"
                      checked={formData.isFree || false}
                      onChange={() => updateFormData('isFree', true)}
                      className="w-4 h-4 text-purple-500"
                    />
                    <span className="text-gray-300">Free</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="pricing"
                      value="paid"
                      checked={!formData.isFree}
                      onChange={() => updateFormData('isFree', false)}
                      className="w-4 h-4 text-purple-500"
                    />
                    <span className="text-gray-300">Paid</span>
                  </label>
                </div>
              </div>
        
              {/* Ticket Price (Only if Paid) */}
              {!formData.isFree && (
                <div>
                  <label className="block mb-2 text-gray-300">Ticket Price</label>
                  <div className="relative">
                    <DollarSign className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="number"
                      value={formData.price ?? ""}
                      onChange={(e) => updateFormData('price', isNaN(e.target.valueAsNumber) ? "" : e.target.valueAsNumber)}
                      className="w-full p-3 pl-10 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              )}
        
              {/* Maximum Attendees */}
              <div>
                <label className="block mb-2 text-gray-300">Maximum Attendees</label>
                <div className="relative">
                  <Users className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="number"
                    value={formData.maxAttendees ?? ""}
                    onChange={(e) => updateFormData('maxAttendees', isNaN(e.target.valueAsNumber) ? "" : e.target.valueAsNumber)}
                    className="w-full p-3 pl-10 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Enter maximum attendees"
                    min="1"
                  />
                </div>
              </div>
            </div>
          );
        
        

      case 'review':
        return (
          <div className="space-y-6">
            <h3 className="mb-4 text-xl font-semibold text-white">Review Event Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400">Event Title</label>
                <p className="text-white">{formData.title}</p>
              </div>
              <div>
                <label className="text-gray-400">Date</label>
                <p className="text-white">{new Date(formData.date).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-gray-400">Category</label>
                <p className="text-white">{formData.category}</p>
              </div>
              <div>
                <label className="text-gray-400">University</label>
                <p className="text-white">{formData.universityName}</p>
              </div>
              <div>
                <label className="text-gray-400">Event Type</label>
                <p className="text-white capitalize">{formData.eventType}</p>
              </div>
              {formData.eventType === 'virtual' ? (
                <div>
                  <label className="text-gray-400">Meeting Link</label>
                  <p className="text-purple-400">{formData.meetingLink}</p>
                </div>
              ) : (
                <div>
                  <label className="text-gray-400">Location</label>
                  <p className="text-white">{formData.location}</p>
                </div>
              )}
              <div className="col-span-2">
                <label className="text-gray-400">Description</label>
                <p className="text-white">{formData.description}</p>
              </div>
              <div className="col-span-2">
                <label className="text-gray-400">Event Image</label>
                {formData.eventImage && (
                  <img
                    src={formData.eventImage}
                    alt="Event"
                    className="object-cover w-full h-48 mt-2 rounded-lg"
                  />
                )}
              </div>
              <div>
                <label className="text-gray-400">Speaker Name</label>
                <p className="text-white">{formData.speakerName}</p>
              </div>
              <div>
                <label className="text-gray-400">Speaker Bio</label>
                <p className="text-white">{formData.speakerBio}</p>
              </div>
              <div>
                <label className="text-gray-400">Sponsor</label>
                <p className="text-white">{formData.sponsorName}</p>
              </div>
              {formData.sponsorLogo && (
                <div>
                  <label className="text-gray-400">Sponsor Logo</label>
                  <img
                    src={formData.sponsorLogo}
                    alt="Sponsor"
                    className="object-contain w-24 h-24 mt-2 rounded-lg"
                  />
                </div>
              )}
              <div>
                <label className="text-gray-400">Price</label>
                <p className="text-white">${formData.price}</p>
              </div>
              <div>
                <label className="text-gray-400">Maximum Attendees</label>
                <p className="text-white">{formData.maxAttendees}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Create New Event</h2>
        <button 
          type="button" 
          onClick={onClose}
          className="text-gray-400 transition-colors hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {renderStepIndicator()}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handleBack}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-colors
            ${currentStepIndex === 0 
              ? 'opacity-50 cursor-not-allowed' 
              : 'bg-gray-700 hover:bg-gray-600'}`}
          disabled={currentStepIndex === 0}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {currentStep === 'review' ? (
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-opacity rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
          >
            <Check className="w-5 h-5" />
            Create Event
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-colors
              ${!canProceed
                ? 'opacity-50 cursor-not-allowed bg-gray-700'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90'}`}
            disabled={!canProceed}
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;