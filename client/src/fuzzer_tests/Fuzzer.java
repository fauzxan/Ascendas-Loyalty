package fuzzer_tests;

import java.util.*;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.time.*;

public class Fuzzer {
    public static void main(String[] args) throws Exception {
        runFuzzy();
        }
    
    public static String fuzzyFuzzer(int length, String mode) {
        String alphabets_capital = "abcdefghijklmnopqrstuvwxyz";
        String alphabets_lower = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String numbers = "1234567890";
        String characters = "`~!@#$%^&*()_+-={}|[]:;<>?,./\\\\";
        int input_pool_length = 0;
        String input_pool;
        String output = "";

        if (mode.equals("email")) {
            input_pool = alphabets_capital + alphabets_lower + "`~!#$%^&*_+-={}|?./";
            input_pool_length = input_pool.length();
            int at_index = (int)(Math.random()*length - 2);
            int dot_index = (int)(Math.random()*length + at_index);
            for (int i = 0; i < length; i++) {
                if (i == at_index) {
                    output += "@";
                } else if (i == dot_index) {
                    output += ".";
                } else if (i > at_index) {
                    input_pool = alphabets_capital + alphabets_lower + ".";
                    input_pool_length = input_pool.length();
                    output += input_pool.charAt((int)(Math.random()*input_pool_length));
                } else {
                    output += input_pool.charAt((int)(Math.random()*input_pool_length));
                }
            }

        } else {
            input_pool = alphabets_capital + alphabets_lower + numbers + characters;
            input_pool_length = input_pool.length();
            for (int i = 0; i < length; i++) {
                output += input_pool.charAt((int)Math.random()*input_pool_length);
            }
        }
        return output;        
    }
 
    public static void runFuzzy() throws FileNotFoundException, ScriptException, NoSuchMethodException {
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("JavaScript");
        engine.eval(new FileReader("login_test.js"));  
        Invocable invocable = (Invocable)engine;
        int counter = 10;
        long startTime = System.nanoTime();
        long finalTime = 0;

        while (finalTime != 10000) {
            invocable.invokeFunction("login_test",fuzzyFuzzer(counter, "email"), fuzzyFuzzer(counter, null)); 
            finalTime = System.nanoTime() - startTime;
            counter++;
        }
        

        
    }

    public static void createCSV(List<List<String>> data, String filename) {
        File output = new File(filename);
        try (PrintWriter pw = new PrintWriter(output)) {
            for (int i = 0; i < data.size(); i++) {
                StringBuilder sb = new StringBuilder();
                for (int j = 0; j < data.get(0).size(); j++) {
                    sb.append(data.get(i).get(j) + ",");
                }
                sb.append("\n");
                //System.out.println(sb.toString());                                    
                pw.write(sb.toString());
            }
        } catch (Exception e) {
            System.out.println("createCSV fail");
        }
    }
     
}

