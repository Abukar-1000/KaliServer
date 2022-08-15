#include <iostream>
#include <thread>
#include <string>
#include <map>

std::string phrase = "";
bool running = true;

void first() {

    std::map<int,std::string> mapping = {
        {0,"a"},{1,"b"},{3,"c"},{4,"d"},
        {5,"e"},{6,"f"},{7,"g"},{8,"h"},
        {9,"i"},{10,"j"},{11,"k"},{12,"l"},
        {13,"m"},{14,"n"},{15,"o"},{16,"p"},
        {17,"q"},{18,"r"},{19,"s"},{20,"t"},
        {21,"u"},{21,"v"},{22,"w"},{23,"x"},
        {24,"y"},{25,"z"}
    };

    int spot = 0;
    while (running) {
        spot = rand() % 25;
        // std::cout << spot << "\n";
        auto iter = mapping.find(spot);
        phrase += iter->second;

        if (phrase.length() > 25){
            phrase = "";
            spot = rand() % 25;
            std::cout << spot << "\n";
            auto iter = mapping.find(spot);
            phrase += iter->second;
        }
    }
}

std::string convertToAsc(std::string phrasei) {
    std::string result = "";
    for (int i = 0; i < phrasei.length(); ++i)
        result += std::to_string((int)phrasei[i]) + " ";
    return result;
}

void second(){
    while (running) {
        if (phrase.length() > 0){
            std::cout << phrase + " converts to " << convertToAsc(phrase) << "\n";
        }
    }
}
int main() {

    // std::thread f1(first);
    // std::thread f2(second);
    std::string line = "this is cpp";
    std::cout << (int)line[0];
    return 0;
}