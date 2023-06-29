import { PureComponent } from 'react'

class ServiceWeb extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='service-content clearfix'>
        <div className='service-content-img'>
          <img src='img/service-img2.jpg'  alt={}/>
        </div>
        <p className='service-content-text'>
          Et quot utroque oportere vel, est doctus lobortis ut. Doming
          consequuntur sed ut, iudico ridens utroque ne sed, usu quis suavitate
          ea. Ne dico nullam deseruisse vix, posse definitiones usu ex. Option
          ponderum laboramus cum te, te vel munere intellegam. Animal pertinacia
          sit at, ne fierent appetere suavitate mei.
        </p>
      </div>
    )
  }
}

class ServiceGraphic extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='service-content clearfix'>
        <div className='service-content-img'>
          <img src='img/service-img1.jpg'  alt={}/>
        </div>
        <p className='service-content-text'>
          Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
          Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur
          aliquet quam id dui posuere blandit. Nulla porttitor accumsan
          tincidunt. Cras ultricies ligula sed magna dictum porta. Curabitur non
          nulla sit amet nisl tempus convallis quis ac lectus. Vivamus suscipit
          tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui
          posuere blandit. Nulla porttitor accumsan tincidunt. Cras ultricies
          ligula sed magna dictum porta.
        </p>
      </div>
    )
  }
}

class ServiceSupport extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='service-content clearfix'>
        <div className='service-content-img'>
          <img src='img/service-img2.jpg' />
        </div>
        <p className='service-content-text'>
          Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur
          aliquet quam id dui posuere blandit. Nulla porttitor accumsan
          tincidunt. Cras ultricies ligula sed magna dictum porta. Curabitur non
          nulla sit amet nisl tempus convallis quis ac lectus. Vivamus suscipit
          tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui
          posuere blandit. Nulla porttitor accumsan tincidunt. Cras ultricies
          ligula sed magna dictum porta. Curabitur non nulla sit amet nisl
          tempus convallis quis ac lectus.
        </p>
      </div>
    )
  }
}

class ServiceApp extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='service-content clearfix'>
        <div className='service-content-img'>
          <img src='img/service-img1.jpg' />
        </div>
        <p className='service-content-text'>
          Lorem ipsum dolor sit amet, id pro dicunt audire probatus, no doming
          menandri torquatos eum, no cum natum mandamus. Pro at graeci
          salutatus. Amet munere honestatis per ad, causae meliore percipitur no
          his. An eos minimum assentior scriptorem. Ad exerci volumus
          efficiantur usu, duo no facete constituam conclusionemque, menandri
          pertinacia sententiae vim no.
        </p>
      </div>
    )
  }
}

class ServiceMarketing extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='service-content clearfix'>
        <div className='service-content-img'>
          <img src='img/service-img2.jpg' />
        </div>
        <p className='service-content-text'>
          Mentitum qualisque ex sed, qui quaeque docendi interpretaris in. Ut
          duo possim vocent liberavisse, sale commodo ex cum, tollit delicata
          reprimique pri ut. Alienum deseruisse dissentiunt et has, nobis
          consequuntur mel ea, at ludus oratio noster vim. Id eum nominavi
          assueverit, error eloquentiam qui no, id est dicant quaeque. Affert
          consetetur pri id, sed nullam ridens facilis ne, congue labores
          scripserit ut sit.
        </p>
      </div>
    )
  }
}

class ServiceSeo extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='service-content clearfix'>
        <div className='service-content-img'>
          <img src='img/service-img1.jpg' />
        </div>
        <p className='service-content-text'>
          Habeo apeirian eos et. Dicant molestie in mel. Cu mea epicurei
          evertitur. Mucius definitionem ad vim, vim rebum accusam epicuri et.
          Mel rebum dignissim mediocritatem te, amet case erat his no, mei ne
          dolore hendrerit. Quo no doctus detracto reformidans.
        </p>
      </div>
    )
  }
}

export default {
  ServiceWeb,
  ServiceGraphic,
  ServiceSupport,
  ServiceApp,
  ServiceSeo,
  ServiceMarketing,
}
