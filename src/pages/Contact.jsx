import React, { useState } from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";

// Generate an SVG data URL for the icon
const iconSvg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"></path></svg>`);

const customMarkerIcon = new L.Icon({
  iconUrl: `data:image/svg+xml,${iconSvg}`,
  iconSize: [30, 30], // Adjust icon size here
  iconAnchor: [15, 30], // Point of the icon that will correspond to marker's location
  popupAnchor: [0, -30], // Point from which the popup should open relative to the iconAnchor
});

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formStatus, setFormStatus] = useState(null);

  const center = { lat: 19.979479529548097, lng: 85.63395864901291 };

  const onSubmit = (data) => {
    console.log(data);
    setFormStatus("Your message has been sent!");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Navbar />

      <div className="container mx-auto p-6 md:p-12">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Contact Us</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  type="text"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "Invalid email address" }
                  })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  type="email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  rows="4"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300"
              >
                Send Message
              </button>
              {formStatus && <p className="text-green-500 text-center mt-4">{formStatus}</p>}
            </form>
          </div>

          {/* Map Section */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6">
            <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Our Location</h2>
            <MapContainer center={center} zoom={12} style={{ width: "100%", height: "400px" }}>
              <TileLayer
                url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
              />
              <Marker position={center} icon={customMarkerIcon}>
                <Popup>Our Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
