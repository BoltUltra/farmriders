'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { LocationDiscover, Truck } from 'iconsax-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { dashboardVehicle, truck } from '../public/images/webp'
import { DriverMap, Modal } from "@/app/components";
import toast from 'react-hot-toast'
import io from 'socket.io-client'

const DashboardHome = () => {
  let [isOpen, setIsOpen] = useState(false)
  const [driverLocation, setDriverLocation] = useState({ latitude: 0, longitude: 0 });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Get the user's location
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setDriverLocation({ latitude, longitude });
            console.log('Current Location:', latitude, longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {

    const socket = io('https://farm-riders-python-implementation.onrender.com');
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      toast.success('Connected to WebSocket server');
    });

    socket.on('driverLocation', (location) => {
      console.log('Received driver location:', location);
      setDriverLocation({
        latitude: location.latitude,
        longitude: location.longitude
      });
    });

    socket.on('disconnect', () => {
      toast.error('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal closeModal={closeModal} isOpen={isOpen} />

      <section className='flex w-full md:space-x-10 '>
        <div className='w-[40%] space-y-10'>
          <div className='rounded-lg border border-primary p-7 space-y-4'>
            <div className="flex items-center space-x-3">
              <div className='flex h-10 w-10 p-2 rounded-full items-center justify-center bg-[#c4eec8]'>
                <Truck size="32" color="#3db24a" variant="Outline" />
              </div>
              <h3 className='text-2xl font-semibold'>Current Active Order</h3>
            </div>
            <p>Easily transport your goods or rent farm vehicles.</p>

            {/* <button onClick={openModal} className="w-full py-3 text-white bg-primary rounded-md">Order Now</button> */}
          </div>
          <div className='rounded-lg border border-primary p-7 space-y-4'>
            <div className="w-full">
              <TabGroup>
                <TabList className="flex gap-4 justify-between">
                  <Tab className="rounded-full py-1 font-semibold hover:underline underline-offset-4 focus:outline-none data-[selected]:text-primary data-[selected]:underline data-[selected]:underline-offset-4">
                    Tracking
                  </Tab>
                  <Tab className="rounded-full py-1 font-semibold hover:underline underline-offset-4 focus:outline-none data-[selected]:text-primary data-[selected]:underline data-[selected]:underline-offset-4">
                    Vehicles
                  </Tab>
                  <Tab className="rounded-full py-1 font-semibold hover:underline underline-offset-4 focus:outline-none data-[selected]:text-primary data-[selected]:underline data-[selected]:underline-offset-4">
                    Messages
                  </Tab>
                </TabList>
                <TabPanels className="mt-3">
                  <TabPanel className="">
                    <div className='space-y-6'>
                      <div className="flex items-center space-x-3">
                        <div className='flex h-10 w-10 p-2 rounded-full items-center justify-center bg-[#c4eec8]'>
                          <LocationDiscover size="32" color="#3db24a" variant="Outline" />
                        </div>
                        <h3 className='text-2xl font-semibold'>Track Your Order</h3>
                      </div>
                      <p className='text-center'>Live tracking of your truck or farm equipment.</p>
                      <hr />
                      <div className="bg-primary/5 rounded-lg p-3 space-y-3">
                        <p>Current Order ID: <span className="font-semibold">{`123 - 459 - 987`}</span></p>
                        <div className="flex items-center w-full space-x-3">
                          <div className="h-2 w-1/5 bg-primary"></div>
                          <div className="h-2 w-1/5 bg-primary/40"></div>
                          <div className="h-2 w-1/5 bg-input"></div>
                          <div className="h-2 w-1/5 bg-input"></div>
                          <div className="h-2 w-1/5 bg-input"></div>
                        </div>
                        <p className="text-center font-semibold text-sm">20% complete</p>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="">
                    <div>
                      Boss
                    </div>
                  </TabPanel>
                  <TabPanel className="">
                    <div>
                      Boss
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </div>
        <div className='w-[60%] rounded-lg overflow-hidden'>
          <DriverMap driverLocation={driverLocation} />
        </div>
      </section>
    </>
  )
}

export default DashboardHome
