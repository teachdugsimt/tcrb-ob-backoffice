import React, { Component } from 'react';
import { i18n, withNamespaces } from '../i18n'
function Natty() {
  return (
    <div>
      <button
        onClick={() => {
          console.log("Now language : ", i18n.language)
          i18n.changeLanguage(i18n.language == 'en' ? 'th' : 'en')
        }}
      >Change Language</button>
      <h1>Result I18n : </h1>
      <h1>{i18n.t("bank")}</h1>
    </div>
  );
}
export default Natty;
