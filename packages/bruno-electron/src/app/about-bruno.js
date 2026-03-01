module.exports = function aboutBruno({ version }) {
  const currentYear = new Date().getFullYear();
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1, user-scalable=yes">
        <title>About Oreo</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin: 0;
                padding: 10px;
                background-color: #f4f4f4;
                color: #333;
            }
            .logo {
                margin-top: 0px;
            }
            .title {
                font-size: 24px;
                margin-top: 5px;
                font-weight: bold;
                color: #222;
            }
            .description {
                font-size: 12px;
                color: #222;
                margin-top: 5px;
            }
            .buttons {
                margin-top: 5px;
            }
            .footer {
                margin-top: 5px;
                padding: 5px;
                font-size: 14px;
                color: #555;
            }
            .link {
                display: inline-block;
                margin-top: 10px;
                padding: 10px 15px;
                background-color: #F4AA41;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background 0.3s;
            }
            .link:hover {
                background-color: #F4AA41;
            }
        </style>
    </head>
    <body>
      <div class="logo">
      </div>
        <svg width="100" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M14 28 Q10 12, 18 8 Q24 6, 26 16 Q27 22, 24 30Z" fill="#1a1a1a" />
            <path d="M16 24 Q14 16, 19 12 Q22 10, 23 17Z" fill="#2a2a2a" />
            <path d="M58 28 Q62 12, 54 8 Q48 6, 46 16 Q45 22, 48 30Z" fill="#1a1a1a" />
            <path d="M56 24 Q58 16, 53 12 Q50 10, 49 17Z" fill="#2a2a2a" />
            <ellipse cx="36" cy="36" rx="18" ry="20" fill="#1a1a1a" />
            <path d="M36 17 C34 17, 32.5 20, 32 24 C31.5 28, 32 31, 31 34 C30 37, 28 39, 27 42 C26 46, 28 52, 36 54 C44 52, 46 46, 45 42 C44 39, 42 37, 41 34 C40 31, 40.5 28, 40 24 C39.5 20, 38 17, 36 17Z" fill="#FFFFFF" />
            <ellipse cx="36" cy="47" rx="12" ry="9" fill="#FFFFFF" />
            <path d="M24 28 Q22 30, 22 34 Q22 36, 26 36 Q30 36, 31 33 Q31 29, 28 27Z" fill="#1a1a1a" />
            <path d="M48 28 Q50 30, 50 34 Q50 36, 46 36 Q42 36, 41 33 Q41 29, 44 27Z" fill="#1a1a1a" />
            <ellipse cx="27" cy="32" rx="2.2" ry="2.5" fill="#3d2b1a" />
            <ellipse cx="45" cy="32" rx="2.2" ry="2.5" fill="#3d2b1a" />
            <circle cx="27.8" cy="31.2" r="0.9" fill="#FFFFFF" />
            <circle cx="45.8" cy="31.2" r="0.9" fill="#FFFFFF" />
            <path d="M24 27 Q26 25, 28 26" fill="none" stroke="#c6894a" stroke-width="1.8" stroke-linecap="round" />
            <path d="M48 27 Q46 25, 44 26" fill="none" stroke="#c6894a" stroke-width="1.8" stroke-linecap="round" />
            <circle cx="25" cy="37" r="1.2" fill="#c6894a" opacity="0.7" />
            <circle cx="47" cy="37" r="1.2" fill="#c6894a" opacity="0.7" />
            <path d="M33 42 Q36 39, 39 42 Q38 44.5, 36 45 Q34 44.5, 33 42Z" fill="#1a1a1a" />
            <ellipse cx="35.5" cy="41.5" rx="0.8" ry="0.4" fill="#3a3a3a" />
            <path d="M36 45 L36 47" fill="none" stroke="#555" stroke-width="1" stroke-linecap="round" />
            <path d="M36 47 Q33 50, 30.5 49" fill="none" stroke="#555" stroke-width="1" stroke-linecap="round" />
            <path d="M36 47 Q39 50, 41.5 49" fill="none" stroke="#555" stroke-width="1" stroke-linecap="round" />
            <path d="M28 54 Q36 60, 44 54 Q42 57, 36 58 Q30 57, 28 54Z" fill="#FFFFFF" />
            <path d="M34 20 Q36 18, 38 20" fill="none" stroke="#e8e8e8" stroke-width="0.5" />
            <path d="M33 23 Q36 21, 39 23" fill="none" stroke="#e8e8e8" stroke-width="0.5" />
          </g>
        </svg>
      <h2 class="title">Oreo ${version}</h2>
      <footer class="footer">
          ©${currentYear} Oreo
      </footer>
    </body>
    </html>
  `;
};
