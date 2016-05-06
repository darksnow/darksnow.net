import java.io.UnsupportedEncodingException;

/** 
 * Java implementation of some JavaScript functions to aid in interoprtability
 */
public final class JavaScriptUtils {

    /** 
     * The regular expression used to by encodeURIComponent to match
     * characters which will not be converted.
     * 
     * It consists of *+-!~()' and a character class 'w' which
     * represents all letter of both cases, all digits and _
     */
    public static String uriEncodeRegExp = "[*+-~()'\\w[\\!]]";

    /** 
     * JavaScript encodeURIComponent function. 
     *  
     * Return a string with all characters, except those matched by 
     * the regular expression JavaScriptUtils.uriEncodeRegExp to an 
     * escaped form of a % followed by their two digit HEX value. 
     * 
     * @param component The String to be encoded
     * 
     * @return String The encoded string
     */
    public static String encodeURIComponent(String component) {
        char currentChar;
        StringBuilder out = new StringBuilder();

        for (int i = 0; i < component.length(); i++) {
            currentChar = component.charAt(i);

            if (String.valueOf(currentChar).matches(JavaScriptUtils.uriEncodeRegExp)) {
                out.append(currentChar);
            } else {
                out.append('%');
                String hexString = Integer.toHexString(currentChar);
                if (hexString.length() == 1) {
                    out.append('0');
                }
                out.append(hexString);
            }
        }
        return out.toString();
    }

    /** 
     * JavaScript decodeURIComponent function. 
     * 
     * Decode a string orignally encoded using encodeURIComponent. 
     * See encodeURIComponent for details of the encoding.
     * 
     * @param encoded A string encoded with encodeURIComponent
     * 
     * @return String The original, unescaped, string
     */
    public static String decodeURIComponent(String encoded) throws UnsupportedEncodingException {
        char currentChar;
        int charCode, lb, hb;
        StringBuilder out = new StringBuilder();

        try {
            for (int i = 0; i < encoded.length(); i++) {
                currentChar = encoded.charAt(i);
                switch (currentChar) {
                case '%':
                    hb = Character.digit(encoded.charAt(++i), 16);
                    lb = Character.digit(encoded.charAt(++i), 16);
                    charCode = (hb << 4) | lb;
                    out.append((char)charCode);
                    break;
                case '+':
                    out.append(' ');
                    break;
                default:
                    out.append(currentChar);
                    break;
                }
            }
    
            return out.toString();
        } catch (Exception ex) {
            UnsupportedEncodingException nEx = new UnsupportedEncodingException("Unable to decode: " + encoded);
            nEx.initCause(ex);
            throw nEx;
        }
    }
}

