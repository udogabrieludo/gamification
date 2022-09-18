import React from "react";

const Terms = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <div style={{ margin: "15px 0" }}>
        <div>
          <strong style={{ fontSize: "18px" }}>Introduction</strong>
        </div>
        <div style={{ fontSize: "15px", lineHeight: "1.7rem" }}>
          Welcome to  Biggie's Game !
        </div>
      </div>

      <div style={{ margin: "15px 0" }}>
        <div>
          <strong style={{ fontSize: "18px" }}>Our Service</strong>
        </div>
        <div style={{ fontSize: "15px", lineHeight: "1.7rem" }}>
         Biggie's game is a product of Buttarflai gamification, a
          platform that connects to various organizations and "gamifies" their
          operations and services to the mutual benefit of such organizations
          and their customers. Biggie's game  combines engaging and
          interactive entertainment while dishing out awesome prizes to win.  Playing the
          games is very simple. With a minimum of N100 daily, you stand a chance to
          win several prizes worth Millions of Naira.
        </div>
      </div>

      <div style={{ margin: "15px 0" }}>
        <div>
          <strong style={{ fontSize: "18px" }}>Service Provider</strong>
        </div>
        <div style={{ fontSize: "15px", lineHeight: "1.7rem" }}>
          The entity providing this service is HumberOne International.
        </div>
      </div>

      {/* <div style={{ margin: "15px 0" }}>
                <div>
                  <strong style={{fontSize: '18px'}}>Applicable Terms and Agreements</strong>
                </div>
                <div style={{padding: '15px 0', lineHeight: '1.7rem'}}>
                Your use of our service is based on these terms and agreement: Unless otherwise indicated, this Site is the Sole Proprietary property of HumberOne International and all contents on the Site are owned, controlled and licensed to us and are protected by copyright and trademark law as well as intellectual property laws of the Federal Republic of Nigeria. This Site is not intended for users below the age of 18 years old. Persons under the age of 18 are not permitted to access the Site. No content may be copied, reproduced, uploaded or posted publicly for any commercial use whatsoever without our written permission. 
                </div>
                <div style={{padding: '15px 0', lineHeight: '1.7rem'}}>
                Using the site warrants that all profile information you submit will be true, accurate, current, complete. You have the legal capacity and you agree to comply with these Terms and Conditions. If any content is used by you for commercial purposes, we have the right to suspend or terminate your account and refuse you any and all current users of the site.
                </div>
                <div style={{padding: '15px 0', lineHeight: '1.7rem'}}>
                The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country. Persons who choose to have access to the Site do so on their own initiative and are required to comply with the terms and conditions. You agree that you have read, understood and agreed to be bound by the Terms and conditions by accessing this site. If you do not agree, you will be prohibited from using this site immediately.
                </div>
              </div> */}
      <div>
        <strong style={{ fontSize: "18px" }}>PRIZE REDEMPTION</strong>
        <div style={{ padding: "15px 0", lineHeight: "1.7rem" }}>
          The winner can only redeem the prize with bank account. Tokens can not be converted to real cash. 
        </div>
      </div>
    </div>
  );
};

export default Terms;
