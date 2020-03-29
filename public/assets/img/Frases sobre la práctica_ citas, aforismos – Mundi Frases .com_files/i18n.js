define('i18n', function() { 
/* gettext library */

var catalog = new Array();

function pluralidx(n) {
  var v=(n != 1);
  if (typeof(v) == 'boolean') {
    return v ? 1 : 0;
  } else {
    return v;
  }
}
catalog['Al fine di tutelare i contenuti del sito da illecite condotte predatorie per navigare oltre la pagina 3 \u00e8 necessario registrarsi'] = 'Con el fin de proteger los contenidos del sitio de conductas predatorias ilegales, para navegar m\u00e1s all\u00e1 de la p\u00e1gina 3 es necesario registrarse';
catalog['Annulla l\'operazione'] = 'Anula la operac\u00edon';
catalog['Annulla'] = 'Cancela';
catalog['Attendere ...'] = 'Esperar ...';
catalog['Effettua il login senza popup'] = 'Inicia sesi\u00f3n sin popup';
catalog['Grazie per il tuo voto!'] = '\u00a1Gracias por tu voto!';
catalog['Il blocco popup impedisce di aprire una finestra in cui effettuare il login o registrazione. Fare ora il login senza aprire il popup potrebbe comportare la perdita dei dati che si vuole inviare.'] = 'El bloqueo popup impide abrir una ventana para iniciar sesi\u00f3n o registrarse. Iniciar sesi\u00f3n ahora sin abrir el popup podr\u00eda suponer la p\u00e9rdida de los datos que se quieren enviar.';
catalog['La frase \u00e8 stata aggiunta con successo!'] = '\u00a1La frase se ha a\u00f1adido con \u00e9xito!';
catalog['Logout'] = 'Cerrar Sesi\u00f3n';
catalog['Newsletter'] = 'Newsletter';
catalog['No more than {filesLimit} files are allowed to be uploaded.'] = 'No es posible cargar m\u00e1s de {filesLimit} archivos.';
catalog['Non puoi cancellare questo commento'] = 'No puedes borrar este comentario';
catalog['Non puoi modificare questo commento'] = 'No puedes cambiar este comentario';
catalog['Per continuare a leggere altre frasi estratte a caso dal nostro archivio \u00e8 necessario registrarsi'] = 'Para continuar leyendo otras frases extra\u00eddas aleatoriamente, es necesario registrarse';
catalog['Per proseguire effettua il login'] = 'Para continuar es necesario registrarse';
catalog['Per rendere subito visibile il tuo commento e farlo comparire con il tuo nome \u00e8 necessario registrarsi'] = 'Para que tu comentario sea inmediatamente visible y aparezca tu nombre es necesario registrarse';
catalog['Registrati / Accedi'] = 'Reg\u00edstrate / Inicia sesi\u00f3n';
catalog['Riapri il popup'] = 'Abre de nuevo el popup';
catalog['Riprova l\'accesso/registrazione'] = 'Prueba de nuevo a iniciar sesi\u00f3n';
catalog['Ritaglio immagine'] = 'Recorte imagen';
catalog['Salva'] = 'Guarda';
catalog['Si \u00e8 verificato un errore durante il login o registrazione'] = 'Se ha producido un error durante el inicio de sesi\u00f3n o registro';
catalog['Si \u00e8 verificato un errore durante l\'iscrizione alla newsletter, ti invitiamo a riprovare'] = 'Se ha producido un error durante la inscripci\u00f3n al newsletter, por favor vuelve a intentarlo';
catalog['Si sta aprendo un\'altra finestra da cui potrai accedere al sito o registrarti. Se non appare alcuna finestra controlla che non sia attivo sul tuo browser il blocco dei popup!'] = 'Se est\u00e1 abriendo otra ventana desde donde podr\u00e1s iniciar sesi\u00f3n en el sitio o registrarte. Si no aparece ninguna ventana \u00a1controla que en tu browser no est\u00e9 activado el bloqueo de los popup!';
catalog['The files are being uploaded, if you leave now the upload will be cancelled.'] = 'Los archivos se est\u00e1n cargando, si te vas ahora la carga se cancelar\u00e1.';
catalog['Torna alla schermata di login/registrazione'] = 'Vuelve a la p\u00e1gina de inicio de sesi\u00f3n/registro';
catalog['upload failed!'] = '\u00a1error en la carga!';
catalog['{file} has invalid extension. Only {extensions} are allowed.'] = '{file} tiene extensi\u00f3n no v\u00e1lida. S\u00f3lo {extensions} son admitidas.';
catalog['{file} is empty, please select files again without it.'] = '{file} est\u00e1 vac\u00edo, selecciona archivos de nuevo sin \u00e9l.';
catalog['{file} is too large, maximum file size is {sizeLimit}.'] = '{file} es demasiado grande, el tama\u00f1o m\u00e1ximo de archivo es {sizeLimit}.';
catalog['{file} is too small, minimum file size is {minSizeLimit}.'] = '{file} es demasiado peque\u00f1o, el tama\u00f1o de archivo m\u00ednimo es {minSizeLimit}.';


function gettext(msgid) {
  var value = catalog[msgid];
  if (typeof(value) == 'undefined') {
    return msgid;
  } else {
    return (typeof(value) == 'string') ? value : value[0];
  }
}

function ngettext(singular, plural, count) {
  value = catalog[singular];
  if (typeof(value) == 'undefined') {
    return (count == 1) ? singular : plural;
  } else {
    return value[pluralidx(count)];
  }
}

function gettext_noop(msgid) { return msgid; }

function pgettext(context, msgid) {
  var value = gettext(context + '\x04' + msgid);
  if (value.indexOf('\x04') != -1) {
    value = msgid;
  }
  return value;
}

function npgettext(context, singular, plural, count) {
  var value = ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
  if (value.indexOf('\x04') != -1) {
    value = ngettext(singular, plural, count);
  }
  return value;
}

function interpolate(fmt, obj, named) {
  if (named) {
    return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
  } else {
    return fmt.replace(/%s/g, function(match){return String(obj.shift())});
  }
}

/* formatting library */

var formats = new Array();

formats['DATETIME_FORMAT'] = 'j \\d\\e F \\d\\e Y \\a \\l\\a\\s H:i';
formats['DATE_FORMAT'] = 'j \\d\\e F \\d\\e Y';
formats['DECIMAL_SEPARATOR'] = ',';
formats['MONTH_DAY_FORMAT'] = 'j \\d\\e F';
formats['NUMBER_GROUPING'] = '3';
formats['TIME_FORMAT'] = 'H:i:s';
formats['FIRST_DAY_OF_WEEK'] = '1';
formats['TIME_INPUT_FORMATS'] = ['%H:%M:%S', '%H:%M'];
formats['THOUSAND_SEPARATOR'] = '.';
formats['DATE_INPUT_FORMATS'] = ['%d/%m/%Y', '%d/%m/%y', '%Y-%m-%d'];
formats['YEAR_MONTH_FORMAT'] = 'F \\d\\e Y';
formats['SHORT_DATE_FORMAT'] = 'd/m/Y';
formats['SHORT_DATETIME_FORMAT'] = 'd/m/Y H:i';
formats['DATETIME_INPUT_FORMATS'] = ['%d/%m/%Y %H:%M:%S', '%d/%m/%Y %H:%M', '%d/%m/%y %H:%M:%S', '%d/%m/%y %H:%M', '%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M:%S.%f', '%Y-%m-%d %H:%M', '%Y-%m-%d'];

function get_format(format_type) {
    var value = formats[format_type];
    if (typeof(value) == 'undefined') {
      return format_type;
    } else {
      return value;
    }
}

return {'gettext': gettext, 'ngettext': ngettext, 'gettext_noop': gettext_noop, 'pgettext': pgettext, 'npgettext': npgettext, 'interpolate': interpolate}});