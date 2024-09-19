'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { LocationDiscover, Truck } from 'iconsax-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { dashboardVehicle, truck } from '../public/images/webp'
import { Map, Modal } from "@/app/components";
import { fetchVehicles } from '../services/dataService'

const DashboardHome = () => {

  const [vehicleData, setVehicleData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchAllVehicles = async () => {
      try {
        const response = await fetchVehicles();
        setVehicleData(response.data.vehicles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllVehicles();
  }, []);

  const messages = [
    {
      "id": "66e4c44b2ce8ab538ca5e1d1",
      "name": "User 1",
      "message": "Just checked out the Isuzu NPR. Looks great!",
      "time": "10:15 AM",
      "image_url": "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      "id": "66e4c44e2ce8ab538ca5e1d2",
      "name": "User 2",
      "message": "Just checked out the Tata 407. Looks great!",
      "time": "11:00 AM",
      "image_url": "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      "id": "66e4c44f2ce8ab538ca5e1d3",
      "name": "User 3",
      "message": "Just checked out the Mitsubishi Fuso Canter. Looks great!",
      "time": "12:45 PM",
      "image_url": "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      "id": "66e4c4512ce8ab538ca5e1d4",
      "name": "User 4",
      "message": "Just checked out the 2021 Ford F-150 Pick Up truck. Looks great!",
      "time": "2:30 PM",
      "image_url": "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      "id": "66e4c4522ce8ab538ca5e1d5",
      "name": "User 5",
      "message": "Just checked out the Toyota Hilux. Looks great!",
      "time": "3:00 PM",
      "image_url": "https://randomuser.me/api/portraits/men/5.jpg"
    }
  ]

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <>
      <Modal closeModal={closeModal} isOpen={isOpen} />

      <section className='flex md:flex-row flex-col w-full md:space-x-10 md:space-y-0 space-y-10'>
        <div className='md:w-[40%] space-y-10'>
          <div className='rounded-lg border border-primary p-7 space-y-4'>
            <div className="flex items-center space-x-3">
              <div className='flex h-10 w-10 p-2 rounded-full items-center justify-center bg-[#c4eec8]'>
                <Truck size="32" color="#3db24a" variant="Outline" />
              </div>
              <h3 className='text-2xl font-semibold'>Order</h3>
            </div>
            <p>Easily transport your goods or rent farm vehicles.</p>
            <div className="flex items-center space-x-3">
              <Image src={truck} alt='truck' />
              <h3 className='text-lg'>Order a Truck</h3>
            </div>
            <div className="flex items-center space-x-3">
              <Image src={dashboardVehicle} alt='vehicle' />
              <h3 className='text-lg'>Farm vehicles Rentals</h3>
            </div>
            <button onClick={openModal} className="w-full py-3 text-white bg-primary rounded-md">Order Now</button>
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
                      {vehicleData.length > 0 && (
                        <div className='space-y-6 h-56 overflow-y-scroll custom-scrollbar'>
                          <p className=''>Featured vehicles</p>
                          <div className="space-y-3">
                            {vehicleData.map((vehicle) => {
                              const limitedName = vehicle.name.split(" ").slice(0, 3).join(" ");

                              return (
                                <div key={vehicle.id} className="flex items-center space-x-3 h-20">
                                  <Image src={vehicle.image_url} width={50} height={50} className='rounded-lg object-cover' alt='vehicle' />
                                  <div className="flex items-center justify-between w-full">
                                    <div className="w-[60%]">
                                      <h3 className='font-semibold'>{limitedName}</h3>
                                      <p className="text-sm">NGN{vehicle.price}</p>
                                    </div>
                                    <button className='text-sm bg-primary text-white px-3 py-2 rounded-full w-[40%]'>Order Now</button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {!vehicleData.length && (
                        <p className='text-center'>No vehicles available</p>
                      )}
                    </div>

                  </TabPanel>
                  <TabPanel className="">
                    <div>
                      {messages.length > 0 && (
                        <div className='space-y-6 h-56 overflow-y-scroll custom-scrollbar'>
                          <div className="space-y-3">
                            {messages.map((msg) => (
                              <div key={msg.id} className="flex items-center space-x-3 h-24 cursor-pointer hover:bg-primary/10 transition-all duration-300 ease-in-out p-2 rounded-lg">
                                <Image src={msg.image_url} width={50} height={50} className='rounded-full object-cover' alt='user-img' />
                                <div className="flex items-center justify-between w-full">
                                  <div className="">
                                    <h3 className='font-semibold'>{msg.name}</h3>
                                    <p className="text-sm">{msg.message}</p>
                                    <p className="text-xs text-gray-500">{msg.time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {!messages.length && (
                        <p className='text-center'>No messages available</p>
                      )}
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </div>
        <div className='md:w-[60%] w-full md:h-auto h-96 rounded-lg overflow-hidden'>
          <Map />
        </div>
      </section>
    </>
  )
}

export default DashboardHome;