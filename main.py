import ollama
import json

client = ollama.Client()
with open(r'C:\Users\ASUS\OneDrive - Hanoi University of Science and Technology\AIpentest\Draft\techniques.json', 'r') as f:
    data = json.load(f)
    data = json.dumps(data)

model = "tester_v2"
code = """
@Controller
public class IndexController {
    @GetMapping("/")
    public String index(@RequestParam(defaultValue = "en") String lang, HttpSession session, RedirectAttributes redirectAttributes) {
        if (session.getAttribute("user") == null) {
            return "redirect:/login";
        }

        if (lang.toLowerCase().contains("java")) {
            redirectAttributes.addFlashAttribute("errorMessage", "But.... For what?");
            return "redirect:/";
        }

        return lang + "/index";
    }
}
"""
prompt = """
You will be given a piece of vulnerable code. You task is to detect the vulnerability and choose the possible
exploit technique given below. Only choose from the technique I give you, don't include any trash information.
If you do not find any suitable techniques, just reponse with "CANNOT FIND SUITABLE TECHNIQUES". If you find any
suitable technique, output in the format below. If there are multiple matching techniques, output all of them.
```
- ID: {id of technique}
- NAME: {name of technique}
- REFS: {references of technique}
- POSSIBILITY: {success rate of the technique}
- REASON: {reason why you choose the technique}
```
Here the techniques data in json format:
----- TECHNIQUES DATA START -----
%s
----- TECHNIQUES DATA END -----
Here the vulnerable code:
----- CODE START -----
%s
----- CODE END -----
""" % (data, code)

system = "Main goal: read the flag file"

response = client.generate(model=model, prompt=prompt, format='json')

print(response.response)