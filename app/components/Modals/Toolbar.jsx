import React from 'react';
import styled from 'styled-components';
import Image from "next/image";

const Toolbar = () => {
    return (
        <ToolbarContainer>
            <div className='heading'>
                <h1 className='text-bold text-4xl'>Good morning, Vaibhavi!</h1>
                <h1>Help and feedback ?</h1>
            </div>
            <div className="info-cards">
                <InfoCard>
                    <Image width={50} height={50} src="/introducingtags.png" alt="" />
                    <div>
                        <h3>Introducing tags</h3>
                        <p>Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
                    </div>
                </InfoCard>
                <InfoCard>
                    <Image width={50} height={50} src="/sharenotes.png" alt="" />
                    <div>
                        <h3>Share Notes Instantly</h3>
                        <p>Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</p>
                    </div>
                </InfoCard>
                <InfoCard>
                    <Image width={50} height={50} src="/accessanywhere.png" alt="" />
                    <div>
                        <h3>Access Anywhere</h3>
                        <p>Sync your notes across all devices. Stay productive whether you are on your phone, tablet, or computer.</p>
                    </div>
                </InfoCard>
            </div>
            <div className="actions">
                <div className='search-box'>
                    <input className="search" type="text" placeholder="Search" />
                    <Image width={20} height={20} src="/search.png" alt="" />
                </div>
                <div className='container'>
                    <button>Calendar view</button>
                    <Image width={20} height={20} src="/calender.png" alt="" />
                    <button>Automation</button>
                    <Image width={20} height={20} src="/automation.png" alt="" />
                    <button>Filter</button>
                    <Image width={20} height={20} src="/filter.png" alt="" />
                    <button>Share</button>
                    <Image width={20} height={20} src="/share.png" alt="" />

                </div>
                <button className="create-button">Create new (+)</button>
            </div>
        </ToolbarContainer>
    );
};

const ToolbarContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #f4f5f7;

    .search {
        padding: 5px 30px 5px 10px; 
        width: 100%;
        box-sizing: border-box; 

        &:focus {
            border: 1px solid grey;
            border-radius: 5px;
            outline: none; 
        }
    }

    .heading {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .search-box {
        display: flex;
        align-items: center;
        position: relative; 
    }

    .search-box img {
        position: absolute;
        right: 10px; 
        width: 20px;
        height: 20px;
        pointer-events: none; 
    }

    .info-cards {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .container {
        display: flex;
        gap: 15px;
        align-items: center;
        width: 45%;
        margin-left: 140px;
    }

    .container button {
        color: grey;
        background: none;
        border: none;
        cursor: pointer;
    }

    .create-button {
        color: #fff;
        padding: 10px 20px;
        margin-bottom: 20px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        background-color: #6b46c1;
        &:hover {
            background-color: #553c9a;
        }
    }
`;

const InfoCard = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    max-width: 30%;
    img {
        margin-right: 10px;
        width: 50px;
        height: 50px;
    }

    h3 {
        margin: 0 0 5px;
        font-size: 16px;
    }

    p {
        margin: 0;
        font-size: 14px;
        color: #555;
    }
`;

export default Toolbar;
