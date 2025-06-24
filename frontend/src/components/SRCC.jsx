import React from "react";

// Custom styles
const containerStyle = {
  paddingTop: "100px",
  paddingBottom: "60px",
  background:
    "linear-gradient(135deg, #e0e7ff 0%, #f0f4f7 100%)",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const cardStyle = {
  borderRadius: "1rem",
};

const sectionTitleStyle = {
  fontWeight: "700",
  letterSpacing: "1px",
  textTransform: "uppercase",
};

const companyBadgeStyle = {
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
  borderRadius: "50px",
  transition: "all 0.3s ease",
  cursor: "default",
};

const SRCC = () => {
  return (
    <div className="container" style={containerStyle}>
      <h1 className="mb-5 text-primary text-center display-4 fw-bold">
        SRCC & TC Insurance
      </h1>

      {/* About Section */}
      <section className="mb-5">
        <div
          className="card shadow-lg bg-white border-0"
          style={cardStyle}
        >
          <div className="card-body p-5">
            <h3
              className="card-title mb-4 text-secondary"
              style={sectionTitleStyle}
            >
              About SRCC & T Fund
            </h3>
            <p className="lead">
              The SRCC & T Fund was established in 1988 by a cabinet
              decision on <strong>18th November 1987</strong> titled “Insurance
              Claims Resulting from Losses due to Terrorist Activities,
              Riots and Strikes.”
            </p>
            <p>
              The functions coming under the purview of the SRCC & T Fund have
              been absorbed into the National Insurance Trust Fund in terms of
              section 18(C) of the National Insurance Trust Fund (NITF) Act No.
              28 of 2006.
            </p>
            <p>
              The Extra Ordinary Gazette No. 1542/11 issued on 25th March 2008
              specifies how to deal with Strikes, Riots, Civil Commotions and
              Terrorism situations within the country. According to this Gazette,
              all sums received as insurance premiums in respect of SRCC & T are
              utilized for meeting the just requirements of the insurance
              industry and for strengthening the national economy. All insurance
              covers issued by Insurance Companies in respect of these matters
              shall be obtained from NITF.
            </p>
          </div>
        </div>
      </section>

      {/* To Whom Section */}
      <section className="mb-5">
        <div
          className="card shadow-lg border-primary bg-white"
          style={cardStyle}
        >
          <div className="card-body p-5">
            <h3
              className="card-title mb-4 text-primary"
              style={sectionTitleStyle}
            >
              To Whom
            </h3>
            <p className="lead">
              This is most applicable to the insurance policyholders who are
              exposed to risks that arise due to Strike, Riot, Civil Commotion
              and Terrorism activities which could be obtained as an extension
              to the basic insurance policies issued by all General Insurance
              Companies operating in Sri Lanka and which are members of SRCC & T
              Fund.
            </p>
            <p>
              It is agreed and understood that otherwise, subject to the terms,
              exclusions, provisions and conditions contained in the policy or
              endorsed thereon and subjected to the insured having paid the
              extra premium as per the Limits & Rates Schedule of the Fund.
            </p>
          </div>
        </div>
      </section>

      {/* Claim Procedure Section */}
      <section className="mb-5">
        <div
          className="card shadow-lg border-success bg-white"
          style={cardStyle}
        >
          <div className="card-body p-5">
            <h3
              className="card-title mb-4 text-success"
              style={sectionTitleStyle}
            >
              Claim Procedure
            </h3>
            <ol className="fs-5">
              <li className="mb-3">
                Insured should inform the loss to the respective General
                Insurance Company immediately.
              </li>
              <li className="mb-3">
                The Insurer decides whether the claim falls within the SRCC & T
                Endorsements. If so, the claim has to be intimated to the SRCC
                & T Fund of NITF with the loss estimate immediately.
              </li>
              <li className="mb-3">
                After checking all the required documents are in order, these
                claims will be placed before the Working Committee and the
                Technical Advisory Committee of the SRCC & T Fund for their
                approval and settlement of claims.
              </li>
              <li>
                The above committees consist of technical and professional
                members of the General Insurance Companies and the Management of
                NITF.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="mb-5">
        <h3
          className="mb-4 text-warning text-center fw-bold"
          style={{ ...sectionTitleStyle, fontSize: "1.8rem" }}
        >
          General Insurance Companies under the SRCC & T Fund
        </h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {[
            "Orient Insurance Limited",
            "Sanasa General Insurance Co.Ltd",
            "LOLC General Insurance Limited",
            "People’s Insurance PLC",
            "HNB General Insurance Ltd",
            "Continental Insurance Lanka Ltd",
            "Cooperative Insurance Co.Ltd",
            "Allianz Insurance Lanka Ltd",
            "Sri Lanka Insurance Corporation Ltd",
            "Amana Takaful PLC",
            "Fairfirst Insurance Ltd",
            "MBSL Insurance Co.Ltd",
            "Ceylinco General Insurance Limited",
          ].map((company, i) => (
            <div className="col" key={i}>
              <div
                className="card border-info h-100 shadow-sm bg-white text-center"
                style={{
                  ...cardStyle,
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="card-body d-flex align-items-center justify-content-center">
                  <span
                    className="badge bg-info text-white"
                    style={companyBadgeStyle}
                  >
                    {company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center mt-5 mb-5">
        <h4 className="mb-3 fw-bold text-dark">Contact Us</h4>
        <p className="fs-5 mb-1">
          <i className="bi bi-telephone-fill me-2 text-primary"></i>
          <strong>Phone:</strong> +94 112 026 600 / +94 112 026 669
        </p>
        <p className="fs-5">
          <i className="bi bi-envelope-fill me-2 text-primary"></i>
          <strong>Email:</strong>{" "}
          <a href="mailto:prashan@nitf.lk" className="text-decoration-none">
            prashan@nitf.lk
          </a>
        </p>
      </section>
    </div>
  );
};

export default SRCC;
